using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjectService.Migrations
{
    public partial class Second : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Vehicles_RentACarCompanies_BelongToCompanyId",
                table: "Vehicles");

            migrationBuilder.DropIndex(
                name: "IX_Vehicles_BelongToCompanyId",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "BelongToCompanyId",
                table: "Vehicles");

            migrationBuilder.AddColumn<int>(
                name: "RentACarCompanyId",
                table: "Vehicles",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Vehicles_RentACarCompanyId",
                table: "Vehicles",
                column: "RentACarCompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Vehicles_RentACarCompanies_RentACarCompanyId",
                table: "Vehicles",
                column: "RentACarCompanyId",
                principalTable: "RentACarCompanies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Vehicles_RentACarCompanies_RentACarCompanyId",
                table: "Vehicles");

            migrationBuilder.DropIndex(
                name: "IX_Vehicles_RentACarCompanyId",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "RentACarCompanyId",
                table: "Vehicles");

            migrationBuilder.AddColumn<int>(
                name: "BelongToCompanyId",
                table: "Vehicles",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Vehicles_BelongToCompanyId",
                table: "Vehicles",
                column: "BelongToCompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Vehicles_RentACarCompanies_BelongToCompanyId",
                table: "Vehicles",
                column: "BelongToCompanyId",
                principalTable: "RentACarCompanies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
