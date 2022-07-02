using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Protocol_API.Migrations
{
    public partial class addeddepartment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Visitors_Department_DepartmentId1",
                table: "Visitors");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Department",
                table: "Department");

            migrationBuilder.RenameTable(
                name: "Department",
                newName: "Departments");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Departments",
                table: "Departments",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Visitors_Departments_DepartmentId1",
                table: "Visitors",
                column: "DepartmentId1",
                principalTable: "Departments",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Visitors_Departments_DepartmentId1",
                table: "Visitors");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Departments",
                table: "Departments");

            migrationBuilder.RenameTable(
                name: "Departments",
                newName: "Department");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Department",
                table: "Department",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Visitors_Department_DepartmentId1",
                table: "Visitors",
                column: "DepartmentId1",
                principalTable: "Department",
                principalColumn: "Id");
        }
    }
}
