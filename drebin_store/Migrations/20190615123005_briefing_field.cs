using Microsoft.EntityFrameworkCore.Migrations;

namespace drebin_store.Migrations
{
    public partial class briefing_field : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "BriefingPassed",
                table: "Users",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BriefingPassed",
                table: "Users");
        }
    }
}
