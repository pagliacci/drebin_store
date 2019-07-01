using Microsoft.EntityFrameworkCore.Migrations;

namespace drebin_store.Migrations
{
    public partial class CanManagePermissionsField : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "CanManagePermissions",
                table: "Users",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CanManagePermissions",
                table: "Users");
        }
    }
}
