using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjectService.Migrations
{
    public partial class Fifteenth : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId",
                table: "Flights",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ReservedFlights",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    FlightId = table.Column<int>(nullable: false),
                    ApplicationUserId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReservedFlights", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ReservedFlights_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Passengers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    User_Username = table.Column<string>(nullable: true),
                    User_Fullname = table.Column<string>(nullable: true),
                    User_PassportNumber = table.Column<string>(nullable: true),
                    ReservedFlightId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Passengers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Passengers_ReservedFlights_ReservedFlightId",
                        column: x => x.ReservedFlightId,
                        principalTable: "ReservedFlights",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Flights_ApplicationUserId",
                table: "Flights",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Passengers_ReservedFlightId",
                table: "Passengers",
                column: "ReservedFlightId");

            migrationBuilder.CreateIndex(
                name: "IX_ReservedFlights_ApplicationUserId",
                table: "ReservedFlights",
                column: "ApplicationUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Flights_AspNetUsers_ApplicationUserId",
                table: "Flights",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Flights_AspNetUsers_ApplicationUserId",
                table: "Flights");

            migrationBuilder.DropTable(
                name: "Passengers");

            migrationBuilder.DropTable(
                name: "ReservedFlights");

            migrationBuilder.DropIndex(
                name: "IX_Flights_ApplicationUserId",
                table: "Flights");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "Flights");
        }
    }
}
