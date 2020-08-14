using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjectService.Migrations
{
    public partial class Seventh : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId1",
                table: "Friends",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId2",
                table: "Friends",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Friends_ApplicationUserId1",
                table: "Friends",
                column: "ApplicationUserId1");

            migrationBuilder.CreateIndex(
                name: "IX_Friends_ApplicationUserId2",
                table: "Friends",
                column: "ApplicationUserId2");

            migrationBuilder.AddForeignKey(
                name: "FK_Friends_AspNetUsers_ApplicationUserId1",
                table: "Friends",
                column: "ApplicationUserId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Friends_AspNetUsers_ApplicationUserId2",
                table: "Friends",
                column: "ApplicationUserId2",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Friends_AspNetUsers_ApplicationUserId1",
                table: "Friends");

            migrationBuilder.DropForeignKey(
                name: "FK_Friends_AspNetUsers_ApplicationUserId2",
                table: "Friends");

            migrationBuilder.DropIndex(
                name: "IX_Friends_ApplicationUserId1",
                table: "Friends");

            migrationBuilder.DropIndex(
                name: "IX_Friends_ApplicationUserId2",
                table: "Friends");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId1",
                table: "Friends");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId2",
                table: "Friends");
        }
    }
}
