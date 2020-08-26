using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjectService.Migrations
{
    public partial class Fourteenth : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "User_Name",
                table: "Seats",
                newName: "User_Username");

            migrationBuilder.RenameColumn(
                name: "User_Lastname",
                table: "Seats",
                newName: "User_Fullname");

            migrationBuilder.AddColumn<string>(
                name: "PassportNumber",
                table: "AspNetUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PassportNumber",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "User_Username",
                table: "Seats",
                newName: "User_Name");

            migrationBuilder.RenameColumn(
                name: "User_Fullname",
                table: "Seats",
                newName: "User_Lastname");
        }
    }
}
