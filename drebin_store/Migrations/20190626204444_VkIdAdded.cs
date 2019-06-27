using Microsoft.EntityFrameworkCore.Migrations;

namespace drebin_store.Migrations
{
    public partial class VkIdAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "VkId",
                table: "Users",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "VkId",
                table: "Users");
        }
    }
}
