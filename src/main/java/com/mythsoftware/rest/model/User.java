package com.mythsoftware.rest.model;

import javax.persistence.*;

/** Simple entity used in prototypes
 *
 */
@Entity
@Table(name="users")
public class User {

    private Long id;
    private String firstName;
    private String lastName;
    private String state;
    private String city;
    private String zip;
    private String pa;

    public User() {
    }

    public User(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public User(String firstName, String lastName, String state, String pa, String city, String zip) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.state = state;
        this.pa = pa;
        this.city = city;
        this.zip = zip;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long  getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getState() {
        return state;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCity() {
        return city;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public String getZip() {
        return zip;
    }

    public String getPa() {
        return pa;
    }

    public void setPa(String pa) {
        this.pa = pa;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        User user = (User) o;

        if (!firstName.equals(user.firstName)) return false;
        if (!lastName.equals(user.lastName)) return false;
        if (!state.equals(user.state)) return false;
        if (!city.equals(user.city)) return false;
        if (!zip.equals(user.zip)) return false;
        return pa.equals(user.pa);

    }

    @Override
    public int hashCode() {
        int result = firstName.hashCode();
        result = 31 * result + lastName.hashCode();
        result = 31 * result + state.hashCode();
        result = 31 * result + city.hashCode();
        result = 31 * result + zip.hashCode();
        result = 31 * result + pa.hashCode();
        return result;
    }

    @Override
    public String toString() {
        return "User{" +
                "firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                '}';
    }

}
