package com.banners.server.models;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    @NotBlank
    String name;
    @NotBlank
    String reqName;
    boolean isDeleted;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "category_banners", joinColumns = @JoinColumn(name ="category_id"), inverseJoinColumns = @JoinColumn(name ="banner_id"))
    List<Banner> banners = new ArrayList<>();

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getReqName() {
        return reqName;
    }

    public void setReqName(String reqName) {
        this.reqName = reqName;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }


    public List<Banner> getBanners() {
        return banners;
    }

    public void setBanners(List<Banner> banners) {
        this.banners = banners;
    }

    @Override
    public String toString() {
        return "Category{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", reqName='" + reqName + '\'' +
                ", isDeleted=" + isDeleted +
                ", banners=" + banners +
                '}';
    }
}
