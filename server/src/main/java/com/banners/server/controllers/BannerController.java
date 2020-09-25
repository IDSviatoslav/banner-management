package com.banners.server.controllers;

import com.banners.server.models.Banner;
import com.banners.server.models.Category;
import com.banners.server.models.Request;
import com.banners.server.repos.BannerDB;
import com.banners.server.repos.CategoryDB;
import com.banners.server.repos.RequestDB;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.*;
import java.util.concurrent.TimeUnit;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class BannerController {
    @Autowired
    private BannerDB bannerDB;
    @Autowired
    private CategoryDB categoryDB;
    @Autowired
    private RequestDB requestDB;

    @GetMapping("/banners")
    Iterable<Banner> showAllBanners(){
        return bannerDB.findAll();
    }

    @GetMapping("/banner/{bannerId}")
    Optional<Banner> getBanner(@PathVariable int bannerId){
        System.out.println("in get banner " + bannerId);
        Optional<Banner> foundBanner = bannerDB.findById(bannerId);
        return foundBanner;
    }

    @PostMapping(path = "/banner/{categoryName}")
    ResponseEntity<StringResponse> addBanner(@PathVariable String categoryName , @RequestBody Banner newBanner){
        System.out.println("categoryName = " + categoryName + " new Banner: " + newBanner.getName());
        Category category = categoryDB.findByName(categoryName).orElse(null);
        if (validateBannerInput(newBanner)) {
            if (category != null) {
                if (!bannerDB.findByName(newBanner.getName()).isPresent()) {
                    newBanner.setCategory(category);
                    bannerDB.save(newBanner);
                }
                else return new ResponseEntity<>(new StringResponse("banner already exists"), HttpStatus.BAD_REQUEST);
                category.getBanners().add(newBanner);
                categoryDB.save(category);
                return new ResponseEntity<>(new StringResponse("banner saved"), HttpStatus.OK);
            }
            else return new ResponseEntity<>(new StringResponse("error, category does not exist"), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(new StringResponse("invalid input"), HttpStatus.BAD_REQUEST);
    }

    @PutMapping(path = "/banner/{categoryName}")
    ResponseEntity<StringResponse> updateBanner(@PathVariable String categoryName, @RequestBody Banner updateBanner){
        if (validateBannerInput(updateBanner)) {
                Banner foundBanner = bannerDB.findById(updateBanner.getId()).orElse(null);
                Category category = categoryDB.findByName(categoryName).orElse(null);
                if (foundBanner != null && category!=null) {
                    foundBanner.setName(updateBanner.getName());
                    foundBanner.setPrice(updateBanner.getPrice());
                    foundBanner.setContent(updateBanner.getContent());
                    foundBanner.setCategory(category);
                    bannerDB.save(foundBanner);
                    return new ResponseEntity<>(new StringResponse("banner updated"), HttpStatus.OK);
            }
            return new ResponseEntity<>(new StringResponse("banner not found"), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(new StringResponse("invalid input"), HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping(path = "/banner/{bannerId}")
    ResponseEntity<StringResponse> deleteBanner(@PathVariable int bannerId){
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
            return new ResponseEntity<>(new StringResponse("banner deleted"), HttpStatus.OK);
        }
        return new ResponseEntity<>(new StringResponse("banner not found"), HttpStatus.BAD_REQUEST);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path = "/bid/{requestName}")
    ResponseEntity<StringResponse> bidRequest(@PathVariable String requestName, HttpServletRequest servletRequest){
        Date curTime = new Date();
        System.out.println("request name:" + requestName);

        String ipAddress = servletRequest.getRemoteAddr();
        System.out.println("remote address: " + ipAddress);
        String userAgentText = servletRequest.getHeader("User-Agent");
        System.out.println("user agent: " + userAgentText);
        Request curRequest = new Request(ipAddress, userAgentText, curTime);
        List<Request> curUserRequests = requestDB.findByIpAddressAndUserAgentText(ipAddress, userAgentText);
        Category category = categoryDB.findByReqName(requestName).orElse(null);
        List<Banner> banners;
        if (category!=null) {
            banners = category.getBanners();

            for (Request request : curUserRequests){
                System.out.println(request);
                Banner alreadyRequestedBanner = request.getBanner();
                Date timeOfRequest = request.getDate();
                long timeDifference = TimeUnit.MILLISECONDS.toMinutes(curTime.getTime() - timeOfRequest.getTime());
                if (banners.contains(alreadyRequestedBanner) && timeDifference < 5){
                    banners.remove(alreadyRequestedBanner);
                }
            }

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
                    System.out.println("returning:" + banners.get(rand).getContent());
                    curRequest.setBanner(banners.get(rand));
                    requestDB.save(curRequest);
                    return new ResponseEntity<>(new StringResponse(banners.get(rand).getContent()), HttpStatus.OK);
                }
            }
            return new ResponseEntity<>(new StringResponse("no banners currently to show, try later"), HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(new StringResponse("category not found"), HttpStatus.BAD_REQUEST);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = {"/search/banners", "/search/banners/{searchQueryText}"})
    Iterable<Banner> searchBannersByName(@PathVariable(required = false) String searchQueryText){
        if (searchQueryText == null) {
            return bannerDB.findAll();
        }
        return bannerDB.findByNameIgnoreCaseContaining(searchQueryText);
    }

    boolean validateBannerInput(Banner banner){
        return banner.getName().length() <= 255 && banner.getPrice() >= 0;
    }

}