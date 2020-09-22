package com.banners.server;

import com.banners.server.models.Banner;
import com.banners.server.models.Category;
import com.banners.server.models.Request;
import com.banners.server.repos.BannerDB;
import com.banners.server.repos.CategoryDB;
import com.banners.server.repos.RequestDB;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class Controller {
    @Autowired
    private BannerDB bannerDB;
    @Autowired
    private CategoryDB categoryDB;
    @Autowired
    private RequestDB requestDB;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/categories")
    Iterable<Category> showAllCategories(){
        return categoryDB.findAll();
    }

    @GetMapping(path = "/category/{categoryName}")
    Optional<Category> getCategory(@PathVariable String categoryName){
        System.out.println("in get category " + categoryName);
        Optional<Category> foundCategory = categoryDB.findByName(categoryName);
        return foundCategory;
    }

    @PostMapping(path = "/category")
    Category addCategory(@RequestBody Category newCategory){
        System.out.println("added category!" + newCategory);
        if (!categoryDB.findByName(newCategory.getName()).isPresent() && !categoryDB.findByReqName(newCategory.getReqName()).isPresent()) {
            if (validateCategoryInput(newCategory)) {
                categoryDB.save(newCategory);
            }
        }
        return newCategory;
    }

    @DeleteMapping(path = "/category/{categoryId}")
    String deleteCategory(@PathVariable("categoryId") int categoryId){
        System.out.println("catIdRecieved: " + categoryId);
        Category category = categoryDB.findById(categoryId).orElse(null);
        if (category!=null && category.getBanners().isEmpty()){
            category.setDeleted(true);
            categoryDB.save(category);
            return "deleted";
        }
        return "not found";
    }

    @GetMapping("/banners")
    Iterable<Banner> showAllBanners(){
        return bannerDB.findAll();
    }

    @GetMapping("/banner/{bannerName}")
    Optional<Banner> getBanner(@PathVariable String bannerName){
        System.out.println("in get banner " + bannerName);
        Optional<Banner> foundBanner = bannerDB.findByName(bannerName);
        return foundBanner;
    }

    @PostMapping(path = "/category/{categoryId}/banner")
    Banner addBanner(@PathVariable("categoryId") int categoryId, @RequestBody Banner newBanner){
        Category category = categoryDB.findById(categoryId).orElse(null);
        if (category!=null && validateBannerInput(newBanner)){
            if (!bannerDB.findByName(newBanner.getName()).isPresent()) {
                newBanner.setCategory(category);
                bannerDB.save(newBanner);
            }
            else {
                Banner bannerToUpdate = bannerDB.findByName(newBanner.getName()).orElse(null);
                if (bannerToUpdate!=null){
                    bannerToUpdate.setCategory(category);
                    newBanner.setCategory(category);
                    bannerDB.save(newBanner);
                }
            }

            category.getBanners().add(newBanner);
            //newBanner.setCategory(category);
            categoryDB.save(category);
        }
        return newBanner;
    }

    @DeleteMapping(path = "/banner/{bannerId}")
    String deleteBanner(@PathVariable int bannerId){
        Banner banner = bannerDB.findById(bannerId).orElse(null);
        if (banner!=null){
            Category category = categoryDB.findById(banner.getCategory().getId()).orElse(null);
            banner.setDeleted(true);
            banner.setCategory(null);
            bannerDB.save(banner);
            if (category!=null){
                category.getBanners().remove(banner);
                categoryDB.save(category);
            }
            return "deleted";
        }
        return "not found";
    }

    @PostMapping(path = "/bid")
    Banner bidRequest(@RequestParam String requestName, HttpServletRequest request){
        System.out.println("request name:" + requestName);

        String ipAddress = request.getRemoteAddr();
        System.out.println("remote address: " + ipAddress);
        String userAgentText = request.getHeader("User-Agent");
        System.out.println("user agent: " + userAgentText);
        Request curRequest = requestDB.findByIpAddressAndUserAgentText(ipAddress, userAgentText).orElse(null);
        if (categoryDB.findByReqName(requestName).isPresent() && curRequest==null) {
            curRequest = new Request(ipAddress, userAgentText, new Date());
            requestDB.save(curRequest);
        }

        //List<Banner> banners = bannerDB.findAllByCategory_Name(requestName);
        Category category = categoryDB.findByReqName(requestName).orElse(null);
        List<Banner> banners;
        if (category!=null) {
            banners = category.getBanners();
            Collections.sort(banners, (o1, o2) -> (int) (o2.getPrice() - o1.getPrice()));

            System.out.println("sorted banners size " + banners.size());
            for (Banner banner : banners) {
                System.out.println(banner);
            }

            if (!banners.isEmpty()) {
                double max = banners.get(0).getPrice();
                System.out.println("max = " + max);
                ArrayList<Banner> maxBanners = new ArrayList<>();
                for (Banner banner : banners) {
                    if (banner.getPrice() == max) {
                        maxBanners.add(banner);
                    }
                }
                if (!maxBanners.isEmpty()) {
                    System.out.println("maxBannersSize " + maxBanners.size());
                    int rand = 0;
                    if (maxBanners.size() > 1){
                        Random r = new Random();
                        rand = r.nextInt(maxBanners.size());
                        System.out.println("rand " + rand);
                    }
                    return banners.get(rand);
                }
            }
        }
        return null;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "/search/banners/{searchQueryText}")
    Iterable<Banner> searchBannersByName(@PathVariable String searchQueryText){
        Iterable<Banner> found = bannerDB.findByNameIgnoreCaseContaining(searchQueryText);
        if (!searchQueryText.isEmpty()) return found;
        else return bannerDB.findAll();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "/search/banners/")
    Iterable<Banner> getAllBanners() {
        return bannerDB.findAll();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "/search/categories/{searchQueryText}")
    Iterable<Category> searchCategoriesByName(@PathVariable String searchQueryText){
        Iterable<Category> found = categoryDB.findByNameIgnoreCaseContaining(searchQueryText);
        return found;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "/search/categories/")
    Iterable<Category> findAllCategories() {
        return categoryDB.findAll();
    }

    boolean validateCategoryInput(Category category){
        return category.getName().length() <= 255 && category.getReqName().length() <= 255;
    }

    boolean validateBannerInput(Banner banner){
        return banner.getName().length() <= 255;
    }
}