using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using EventManagementTool.Data;
using Microsoft.AspNetCore.Identity;
using System.Configuration;

namespace EventManagementTool.Data
{
    public class EventManagementToolDbContext : IdentityDbContext<Employee>
    {
        public EventManagementToolDbContext(DbContextOptions options) : base (options) 
        {
            
        }
        
        public DbSet<Event> Events { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Participation> Participations { get; set; }
        public DbSet<Feedback> Feedback { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Employee>()
             .HasKey(e => e.EmployeeId);

            modelBuilder.Entity<Employee>(entity => {
                entity.HasIndex(e => e.UserName).IsUnique();
            });

            modelBuilder.Entity<Event>()
            .HasKey(ev => ev.EventId);

            modelBuilder.Entity<Event>()
                .HasOne(ev => ev.Employee)
                .WithMany(e => e.Events)
                .HasForeignKey(ev => ev.EmployeeId)
                .HasPrincipalKey(e => e.EmployeeId)
                .OnDelete(DeleteBehavior.NoAction);


            modelBuilder.Entity<Participation>()
            .HasKey(p => new { p.EmployeeId, p.EventId });

            modelBuilder.Entity<Participation>()
                .HasOne(p => p.Employee)
                .WithMany(e => e.Participations)
                .HasForeignKey(p => p.EmployeeId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Participation>()
                .HasOne(p => p.Event)
                .WithMany(ev => ev.Participations)
                .HasForeignKey(p => p.EventId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Company>()
                .HasKey(a => a.CompanyId);

            modelBuilder.Entity<Company>()
                .HasMany(c => c.Employees)
                .WithOne(e => e.Company)
                .HasForeignKey(e => e.CompanyId);

            modelBuilder.Entity<Feedback>()
                .HasKey(p => new { p.EmployeeId, p.EventId });

            modelBuilder.Entity<Feedback>()
                .HasOne(f => f.Employee)
                .WithMany(e => e.Feedbacks)
                .HasForeignKey(f => f.EmployeeId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Feedback>()
                .HasOne(f => f.Event)
                .WithMany(ev => ev.Feedbacks)
                .HasForeignKey(f => f.EventId)
                .OnDelete(DeleteBehavior.NoAction);
        }

      

    }
}
