package org.example.service;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.data.mongodb.UncategorizedMongoDbException;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

@Service
public class MongoService {

    public MongoTemplate mongoTemplate(String name, String password) {
        String connectionString = "mongodb://mongo:27017/computerClub";

        MongoClientSettings mongoClientSettings = MongoClientSettings.builder()
                .applyConnectionString(new ConnectionString(connectionString))
                .build();
        MongoClient mongoClient = MongoClients.create(mongoClientSettings);

        return new MongoTemplate(mongoClient, "computerClub");
    }
}
