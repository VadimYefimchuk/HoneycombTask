using Microsoft.EntityFrameworkCore.Migrations;

namespace MainTask.Migrations
{
    public partial class ChangeStudentsAgeField : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Age",
                table: "Students",
                type: "int",
                maxLength: 3,
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldMaxLength: 3,
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "Age",
                table: "Students",
                type: "bigint",
                maxLength: 3,
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldMaxLength: 3,
                oldNullable: true);
        }
    }
}
