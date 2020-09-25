package com.banners.server.repos;

import com.banners.server.models.Banner;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface BannerDB extends CrudRepository<Banner, Integer> {
    @Override
    @Query("select e from #{#entityName} e where e.isDeleted=false")
    Iterable<Banner> findAll();

    @Override
    Optional<Banner> findById(Integer id);
    Optional<Banner> findByName(String name);

    @Query("select e from #{#entityName} e where e.isDeleted=false and e.name like %?1%")
    Iterable<Banner> searchQuery(String searchQueryText);
}
