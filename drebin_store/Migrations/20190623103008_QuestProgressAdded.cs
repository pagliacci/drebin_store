using Microsoft.EntityFrameworkCore.Migrations;

namespace drebin_store.Migrations
{
    public partial class QuestProgressAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NumberOfQuestInCurrentAct",
                table: "Users",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NumberOfQuestInCurrentAct",
                table: "Users");
        }
    }
}
