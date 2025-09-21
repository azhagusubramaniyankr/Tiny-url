using Microsoft.EntityFrameworkCore;
using TinyUrlBackend.Data;
using TinyUrlBackend.Models;
using TinyUrlBackend.Dtos;

var builder = WebApplication.CreateBuilder(args);

// Add DbContext with SQLite
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=urls.db"));

// Add Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularDevClient", policy =>
    {
        policy.WithOrigins("http://localhost:4200") // Angular dev server URL
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("AllowAngularDevClient");

// Ensure DB is created
using (var scope = app.Services.CreateScope())
{
    try
    {
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        db.Database.EnsureCreated();
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Database error: {ex.Message}");
    }
}

// Enable Swagger UI

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "TinyUrlBackend API V1");
});

// API Endpoints

// POST: Create short URL
app.MapPost("/api/urls", async (UrlDto dto, AppDbContext db) =>
{
    var shortCode = Guid.NewGuid().ToString("N").Substring(0, 6);

    var url = new Url
    {
        OriginalUrl = dto.OriginalUrl,
        ShortCode = shortCode,
        IsPrivate = dto.IsPrivate,
        Clicks = 0
    };

    db.Urls.Add(url);
    await db.SaveChangesAsync();

    return Results.Created($"/api/urls/{url.Id}", url);
});

// GET: List public URLs
app.MapGet("/api/urls", async (AppDbContext db) =>
    await db.Urls.Where(u => !u.IsPrivate).ToListAsync());

// DELETE: Delete URL
app.MapDelete("/api/urls/{id}", async (int id, AppDbContext db) =>
{
    var url = await db.Urls.FindAsync(id);
    if (url == null) return Results.NotFound();

    db.Urls.Remove(url);
    await db.SaveChangesAsync();

    return Results.NoContent();
});

// GET: Redirect short code → original URL
app.MapGet("/{shortCode}", async (string shortCode, AppDbContext db) =>
{
    var url = await db.Urls.FirstOrDefaultAsync(u => u.ShortCode == shortCode);
    if (url == null) return Results.NotFound();

    url.Clicks++;
    await db.SaveChangesAsync();

    return Results.Redirect(url.OriginalUrl);
});

app.Urls.Clear();
app.Urls.Add("http://localhost:5000");
app.Urls.Add("https://localhost:5001");



app.Run();
