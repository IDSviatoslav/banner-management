package com.banners.server.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "banners")
public class Banner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @NotBlank
    String content;
    @NotBlank
    String name;
    @NotNull
    double price;
    boolean isDeleted;

    @JsonIgnore
    @ManyToOne
    Category category;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "request_banners", joinColumns = @JoinColumn(name ="banner_id"), inverseJoinColumns = @JoinColumn(name ="requests_id"))
    Set<Request> requests = new HashSet<>();


    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        this.isDeleted = deleted;
    }

//    public List<Request> getRequests() {
//        return requests;
//    }
//
//    public void setRequests(List<Request> requests) {
//        this.requests = requests;
//    }

    @Override
    public String toString() {
        return "Banner{" +
                "id=" + id +
                ", content='" + content + '\'' +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", isDeleted=" + isDeleted +
                ", category=" + category.getName() +
                '}';
    }
}
