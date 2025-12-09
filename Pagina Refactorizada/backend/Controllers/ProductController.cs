using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public ProductsController(AppDbContext context) => _context = context;

        [HttpGet]
        public IActionResult GetAll() => Ok(_context.Products.ToList());

        [HttpGet("featured")]
        public IActionResult GetFeatured() => Ok(_context.Products.Where(p => p.IsFeatured).ToList());

        [HttpGet("onsale")]
        public IActionResult GetOnSale() => Ok(_context.Products.Where(p => p.IsOnSale).ToList());
    }
}