package com.banners.server.repos;

import com.banners.server.models.Request;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface RequestDB extends CrudRepository<Request, Integer> {
    Optional<Request> findByIpAddressAndUserAgentText(String ipAddress, String userAgentText);
}
