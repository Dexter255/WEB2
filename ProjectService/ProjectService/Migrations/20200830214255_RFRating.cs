using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjectService.Migrations
{
    public partial class RFRating : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Rating",
                table: "ReservedFlights",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Rating",
                table: "ReservedFlights");
        }
    }
}
