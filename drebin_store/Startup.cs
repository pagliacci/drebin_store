using drebin_store.Database;
using drebin_store.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using AutoMapper;
using drebin_store.Helpers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.HttpOverrides;
using System.Net;
using drebin_store.SignalRHubs;
using WebPush;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace drebin_store
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddAutoMapper();

            // settings objects
            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);

            // configure jwt authentication
            var appSettings = appSettingsSection.Get<AppSettings>();
            var key = Encoding.ASCII.GetBytes(AppSettings.Secret);
            services.AddAuthentication(a =>
                {
                    a.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    a.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                }).AddJwtBearer(b =>
                {
                    b.Events = new JwtBearerEvents
                    {
                        OnTokenValidated = context =>
                        {
                            var userService = context.HttpContext.RequestServices.GetRequiredService<IUserService>();
                            var userId = int.Parse(context.Principal.Identity.Name);
                            var user = userService.GetById(userId);
                            if (user == null)
                            {
                                context.Fail("Unauthorized");
                            }
                            return Task.CompletedTask;
                        }
                    };
                    b.RequireHttpsMetadata = false;
                    b.SaveToken = true;
                    b.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ValidateLifetime = true
                    };
                });

            // Contexts setup
            services.AddDbContext<DatabaseContext>(options =>
                options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection")),
                ServiceLifetime.Transient);

            // Services setup
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IStoreService, StoreService>();
            services.AddScoped<IWebPushService, WebPushService>();
            services.AddScoped<WebPushClient>();

            services.AddSignalR()
                .AddJsonProtocol(options => {
                    //options.PayloadSerializerSettings.ContractResolver = new DefaultContractResolver();
                });

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });

            // Trusted proxy
            services.Configure<ForwardedHeadersOptions>(options =>
            {
                options.KnownProxies.Add(IPAddress.Parse("188.166.102.6")); // TODO: read from config
            });

            // Newtonsoft serialization settings
            JsonConvert.DefaultSettings = () => new JsonSerializerSettings
            {
                Formatting = Formatting.Indented,
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            };
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public async void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });

            app.UseAuthentication();

            app.UseSignalR(routes =>
            {
                routes.MapHub<SignalRHub>("/signalRHub");
            });

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            // TODO: try to migrate on startup later
            //// Create a new scope
            //using (var scope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            //{
            //    // Get the DbContext instance
            //    var dbContext = scope.ServiceProvider.GetRequiredService<DatabaseContext>();

            //    //Do the migration asynchronously
            //    await dbContext.Database.MigrateAsync();
            //}

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp/dist";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                    //spa.UseAngularCliServer(npmScript: "build-full");
                }
            });
        }
    }
}
