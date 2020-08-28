using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjectService.Migrations
{
    public partial class Sixteenth : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Flights_AspNetUsers_ApplicationUserId",
                table: "Flights");

            migrationBuilder.DropIndex(
                name: "IX_Flights_ApplicationUserId",
                table: "Flights");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "Flights");

            migrationBuilder.AddColumn<bool>(
                name: "InvitationAccepted",
                table: "Passengers",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "RowId",
                table: "Passengers",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SeatId",
                table: "Passengers",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "FlightInvitations",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    FlightId = table.Column<int>(nullable: false),
                    InvitationFromUser = table.Column<string>(nullable: true),
                    ApplicationUserId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FlightInvitations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FlightInvitations_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FlightInvitations_ApplicationUserId",
                table: "FlightInvitations",
                column: "ApplicationUserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FlightInvitations");

            migrationBuilder.DropColumn(
                name: "InvitationAccepted",
                table: "Passengers");

            migrationBuilder.DropColumn(
                name: "RowId",
                table: "Passengers");

            migrationBuilder.DropColumn(
                name: "SeatId",
                table: "Passengers");

            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId",
                table: "Flights",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Flights_ApplicationUserId",
                table: "Flights",
                column: "ApplicationUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Flights_AspNetUsers_ApplicationUserId",
                table: "Flights",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
