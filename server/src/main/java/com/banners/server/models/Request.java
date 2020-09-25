package com.banners.server.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "requests")
public class Request {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    String ipAddress;
    String userAgentText;
    Date date;

    @JsonIgnore
    @ManyToOne
    Banner banner;

    public Request(){

    }

    public Request(String ipAddress, String userAgentText, Date date){
        this.ipAddress = ipAddress;
        this.userAgentText = userAgentText;
        this.date = date;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public String getUserAgentText() {
        return userAgentText;
    }

    public void setUserAgentText(String userAgentText) {
        this.userAgentText = userAgentText;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Banner getBanner() {
        return banner;
    }

    public void setBanner(Banner banner) {
        this.banner = banner;
    }

    @Override
    public String toString() {
        return "Request{" +
                "id=" + id +
                ", ipAddress='" + ipAddress + '\'' +
                ", userAgentText='" + userAgentText + '\'' +
                ", date=" + date +
                ", banner=" + banner +
                '}';
    }
}
