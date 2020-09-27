package com.banners.server.repos;

import com.banners.server.models.Category;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface CategoryDB extends CrudRepository<Category, Integer> {
    @Override
    @Query("select e from #{#entityName} e where e.isDeleted=false")
    Iterable<Category> findAll();

    Optional<Category> findByNameAndIsDeleted(String name, boolean isDeleted);

    Optional<Category> findByReqNameAndIsDeleted(String reqName, boolean isDeleted);

    @Query("select e from #{#entityName} e where e.isDeleted=false and e.name like %?1%")
    Iterable<Category> searchQuery(String searchQueryText);
}
