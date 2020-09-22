package com.banners.server.repos;

import com.banners.server.models.Banner;
import com.banners.server.models.Category;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryDB extends CrudRepository<Category, Integer> {
    Optional<Category> findByName(String name);
    Optional<Category> findByReqName(String reqName);
    Iterable<Category> findByNameIgnoreCaseContaining(String searchQueryText);
}
