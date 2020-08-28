using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjectService.Migrations
{
    public partial class QRTRemoved : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "QuickReservationTickets");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "QuickReservationTickets",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AirlineId = table.Column<int>(nullable: true),
                    Discount = table.Column<int>(nullable: false),
                    EndDestination = table.Column<string>(nullable: false),
                    StartDateAndTime = table.Column<DateTime>(nullable: false),
                    StartDestination = table.Column<string>(nullable: false),
                    TicketPrice = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuickReservationTickets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_QuickReservationTickets_Airlines_AirlineId",
                        column: x => x.AirlineId,
                        principalTable: "Airlines",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_QuickReservationTickets_AirlineId",
                table: "QuickReservationTickets",
                column: "AirlineId");
        }
    }
}
