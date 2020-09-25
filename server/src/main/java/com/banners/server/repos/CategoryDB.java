package com.banners.server.repos;

import com.banners.server.models.Category;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface CategoryDB extends CrudRepository<Category, Integer> {
    @Override
    @Query("select e from #{#entityName} e where e.isDeleted=false")
    Iterable<Category> findAll();

    Optional<Category> findByName(String name);

    Optional<Category> findByReqName(String reqName);

    @Query("select e from #{#entityName} e where e.isDeleted=false and e.name like %?1%")
    Iterable<Category> searchQuery(String searchQueryText);
}
