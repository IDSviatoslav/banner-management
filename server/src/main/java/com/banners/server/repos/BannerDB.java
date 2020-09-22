package com.banners.server.repos;

import com.banners.server.models.Banner;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface BannerDB extends CrudRepository<Banner, Integer> {
    @Override
    Optional<Banner> findById(Integer id);
    Optional<Banner> findByName(String name);
    List<Banner> findAllByCategory_Name(String name);
    Iterable<Banner> findByNameIgnoreCaseContaining(String searchQueryText);
}
