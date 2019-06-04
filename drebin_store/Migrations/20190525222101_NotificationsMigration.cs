using Microsoft.EntityFrameworkCore.Migrations;

namespace drebin_store.Migrations
{
    public partial class NotificationsMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "NotificationSubscriptionString",
                table: "Users",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NotificationSubscriptionString",
                table: "Users");
        }
    }
}
