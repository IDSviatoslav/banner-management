package com.banners.server.controllers;

import com.banners.server.models.Banner;
import com.banners.server.models.Category;
import com.banners.server.repos.CategoryDB;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class CategoryController {
    @Autowired
    private CategoryDB categoryDB;

    @GetMapping("/categories")
    Iterable<Category> showAllCategories(){
        return categoryDB.findAll();
    }

    @GetMapping(path = "/category/{categoryId}")
    Optional<Category> getCategory(@PathVariable int categoryId){
        return categoryDB.findById(categoryId);
    }

    @PostMapping(path = "/category")
    ResponseEntity<StringResponse> addCategory(@RequestBody Category newCategory){
        if (!categoryDB.findByNameAndIsDeleted(newCategory.getName(), false).isPresent() && !categoryDB.findByReqNameAndIsDeleted(newCategory.getReqName(), false).isPresent()) {
            if (validateCategoryInput(newCategory)) {
                categoryDB.save(newCategory);
                return new ResponseEntity<>(new StringResponse("category saved"), HttpStatus.OK);
            }
            else return new ResponseEntity (new StringResponse("invalid input"), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(new StringResponse("category already exists"), HttpStatus.BAD_REQUEST);
    }

    @PutMapping(path = "/category")
    ResponseEntity<StringResponse>  updateCategory(@RequestBody Category updateCategory){
        if (validateCategoryInput(updateCategory)) {
            Category foundCategory = categoryDB.findById(updateCategory.getId()).orElse(null);
            if (foundCategory!=null) {
                    foundCategory.setName(updateCategory.getName());
                    foundCategory.setReqName(updateCategory.getReqName());
                    categoryDB.save(foundCategory);
                    return new ResponseEntity<>(new StringResponse("category updated"), HttpStatus.OK);
            }
            else return new ResponseEntity<>(new StringResponse("category not found"), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(new StringResponse("invalid input"), HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping(path = "/category/{categoryId}")
    ResponseEntity<StringResponse> deleteCategory(@PathVariable("categoryId") int categoryId){
        Category category = categoryDB.findById(categoryId).orElse(null);
        if (category!=null) {
            if (category.getBanners().isEmpty()) {
                category.setDeleted(true);
                categoryDB.save(category);
                return new ResponseEntity<>(new StringResponse("category deleted"), HttpStatus.OK);
            } else {
                List<Integer> notDeletedBannersIds = new ArrayList<>();
                System.out.println(category.getBanners());
                for (Banner el : category.getBanners()) {
                    notDeletedBannersIds.add(el.getId());
                }
                return new ResponseEntity<>(new StringResponse("category not deleted, it contains banners: " + notDeletedBannersIds.toString()), HttpStatus.BAD_REQUEST);
            }
        }
        return new ResponseEntity<>(new StringResponse("category not found"), HttpStatus.BAD_REQUEST);
    }

    @GetMapping(path = {"/search/categories", "/search/categories/{searchQueryText}"})
    Iterable<Category> searchCategoriesByName(@PathVariable(required = false) String searchQueryText){
        if (searchQueryText == null) {
            return categoryDB.findAll();
        }
        return categoryDB.searchQuery(searchQueryText);
    }

    boolean validateCategoryInput(Category category){
        return category.getName().length() <= 255 && category.getReqName().length() <= 255;
    }
}
