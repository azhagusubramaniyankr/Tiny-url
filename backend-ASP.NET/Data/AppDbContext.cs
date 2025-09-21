using Microsoft.EntityFrameworkCore;
using TinyUrlBackend.Models;

namespace TinyUrlBackend.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Url> Urls => Set<Url>();
}
