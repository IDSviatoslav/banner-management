package com.banners.server.repos;

import com.banners.server.models.Banner;
import com.banners.server.models.Request;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface RequestDB extends CrudRepository<Request, Integer> {
    List<Request> findByIpAddressAndUserAgentText(String ipAddress, String userAgentText);
    Optional<Request> findByBanner(Banner banner);
}
