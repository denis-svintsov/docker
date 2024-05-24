package org.example.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Document(collection = "entries")
public class Entry {
    @Id
    private String id;
    private String name;
    private String last_name;
    private String phone;
    private String date;

    @Override
    public String toString() {
        return "Entry{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", last_name='" + last_name + '\'' +
                ", phone='" + phone + '\'' +
                ", date='" + date + '\'' +
                '}';
    }
}
