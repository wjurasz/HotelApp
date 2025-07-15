using HotelService.ReservationApi.Extensions;
using HotelService.ReservationApi.Resolvers;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// 1. Kontrolery i JSON
builder.Services
    .AddControllers()
    .AddNewtonsoftJson();

// 2. CORS – poprawiona polityka
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy
            .WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

// 3. Swagger + komentarze XML
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "HotelService API",
        Version = "v1"
    });

    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    if (File.Exists(xmlPath))
    {
        c.IncludeXmlComments(xmlPath);
    }
});

// 4. HTTP Client i DI
builder.Services.AddHttpClient<ClientResolver>();
builder.Services.AddReservationServices();

var app = builder.Build();

// 5. Middleware – KOLEJNOŚĆ jest kluczowa!

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "HotelService API v1");
        c.RoutePrefix = string.Empty;
    });
}

// 🔧 WAŻNE – dodaj, jeśli Twój adres to https://localhost:7074
app.UseHttpsRedirection();

// 🔧 CORS – PRZED autoryzacją
app.UseCors("AllowReactApp");

// (opcjonalnie – logger)
app.Use(async (context, next) =>
{
    Console.WriteLine($"[{context.Request.Method}] {context.Request.Path}");
    await next();
});

app.UseAuthorization();

app.MapControllers();

app.Run();
