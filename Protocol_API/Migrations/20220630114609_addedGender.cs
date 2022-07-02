using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Protocol_API.Migrations
{
    public partial class addedGender : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Gender",
                table: "Visitors",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Gender",
                table: "Visitors");
        }
    }
}
