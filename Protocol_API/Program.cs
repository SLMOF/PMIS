

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.IdentityModel.Tokens;
using Protocol_API.BackgroundServices;
using Protocol_API.Filters;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(config => config.AddDefaultPolicy(c => c.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()));
//Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = builder.Configuration["Jwt:Issuer"],
                        ValidAudience = builder.Configuration["Jwt:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
                    };
                });

builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("Protocol_DB")));

//builder.Services.AddCors(config => config.AddDefaultPolicy(c => c.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()));
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<JwtResolver>();
builder.Services.AddScoped<Logger>();

builder.Services.AddControllers(c =>
{
    //var policy = new AuthorizationPolicyBuilder()
    //                .RequireAuthenticatedUser()
    //                .Build();

    //c.Filters.Add(new AuthorizeFilter(policy));

    c.ModelBinderProviders.Insert(0, new PagingOptionsBinderProvider());
}).AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore); ;
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddSignalR();  
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//builder.Services.AddHostedService<TestServices>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.ConfigureExceptionHandler(app.Environment.IsDevelopment());

app.UseHttpsRedirection();
app.UseRouting();
app.UseCors(options =>
             options.WithOrigins("http://localhost:3000")
             .AllowAnyMethod()
             .AllowAnyHeader()
             .AllowCredentials());
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapHub<Hubs>(pattern: "/signalr");

app.Run();
