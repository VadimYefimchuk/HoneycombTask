using Microsoft.EntityFrameworkCore.Migrations;

namespace MainTask.Migrations
{
    public partial class UpdatedStudentCourseJobTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DaysToStart",
                table: "StudentCourseJobs",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DaysToStart",
                table: "StudentCourseJobs");
        }
    }
}
