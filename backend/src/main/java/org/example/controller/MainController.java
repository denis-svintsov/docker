package org.example.controller;

import org.example.model.Computer;
import org.example.model.Employee;
import org.example.model.Entry;
import org.example.service.MongoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.BasicQuery;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;

@RestController
public class MainController {
    MongoTemplate mongoTemplate;
    @Autowired
    MongoService mongoService;
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String name, @RequestParam String password) {
        mongoTemplate = mongoService.mongoTemplate(name, password);
        return ResponseEntity.ok("Аунтефикация прошла успешно");
    }

    @GetMapping("/employees")
    public ResponseEntity<List<Employee>> employees() {
        List<Employee> list = mongoTemplate.findAll(Employee.class);
        return ResponseEntity.ok(list);
    }
    @GetMapping("/employees/search")
    public ResponseEntity<List<Employee>> employeeByLastName(@RequestParam String lastName) {
        BasicQuery query = new BasicQuery(String.format("{ last_name: {$regex: '%s', $options: 'i'} }", lastName));
        List<Employee> list = mongoTemplate.find(query, Employee.class);
        return ResponseEntity.ok(list);
    }
    @GetMapping("/employees/salary")
    public ResponseEntity<Employee> employeeSalary() {
        GroupOperation sumTotalCityPop = group("state", "city")
                .sum("pop").as("cityPop");
        GroupOperation averageStatePop = group("_id.state")
                .avg("cityPop").as("avgCityPop");
        SortOperation sortByAvgPopAsc = sort(Sort.by(Sort.Direction.ASC, "avgCityPop"));
        LimitOperation limitToOnlyFirstDoc = limit(1);
        ProjectionOperation projectToMatchModel = project()
                .andExpression("_id").as("state")
                .andExpression("avgCityPop").as("statePop");

        Aggregation aggregation = newAggregation(
                sumTotalCityPop, averageStatePop, sortByAvgPopAsc,
                limitToOnlyFirstDoc, projectToMatchModel);

        AggregationResults<Employee> result = mongoTemplate
                .aggregate(aggregation, "zips", Employee.class);
        Employee smallestState = result.getUniqueMappedResult();
        return ResponseEntity.ok(smallestState);
    }
    @GetMapping("/employees/{id}")
    public ResponseEntity<Employee> employeeById(@PathVariable  String id) {
        Employee list = mongoTemplate.findById(id, Employee.class);
        return ResponseEntity.ok(list);
    }
    @PostMapping("/employees/add")
    public ResponseEntity<String> saveEmployee(@RequestBody Employee employee) {
        mongoTemplate.save(employee);
        return ResponseEntity.ok("Обновлен успешно");
    }
    @PostMapping("/employees/delete")
    public ResponseEntity<String> deleteEmployee(@RequestBody Employee employee) {
        mongoTemplate.remove(employee);
        return ResponseEntity.ok("Удалено");
    }

    @GetMapping("/computers")
    public ResponseEntity<List<Computer>> computers() {
        List<Computer> list = mongoTemplate.findAll(Computer.class);
        return ResponseEntity.ok(list);
    }
    @GetMapping("/computers/search")
    public ResponseEntity<List<Computer>> computersByProcessor(@RequestParam String search) {
        BasicQuery query = new BasicQuery(String.format("{ processor: {$regex: '%s', $options: 'i'} }", search));
        List<Computer> list = mongoTemplate.find(query, Computer.class);
        return ResponseEntity.ok(list);
    }
    @GetMapping("/computers/{id}")
    public ResponseEntity<Computer> computerById(@PathVariable String id) {
        Computer list = mongoTemplate.findById(id, Computer.class);
        return ResponseEntity.ok(list);
    }
    @PostMapping("/computers/add")
    public ResponseEntity<String> addComputer(@RequestBody Computer computer) {
        mongoTemplate.save(computer);
        return ResponseEntity.ok("Добавлено");
    }
    @PostMapping("/computers/delete")
    public ResponseEntity<String> deleteComputer(@RequestBody Computer computer) {
        mongoTemplate.remove(computer);
        return ResponseEntity.ok("Удалено");
    }

    @GetMapping("/entries")
    public ResponseEntity<List<Entry>> entries() {
        List<Entry> list = mongoTemplate.findAll(Entry.class);
        return ResponseEntity.ok(list);
    }
    @GetMapping("/entries/search")
    public ResponseEntity<List<Entry>> entryByLastName(@RequestParam String lastName) {
        BasicQuery query = new BasicQuery(String.format("{ last_name: {$regex: '%s', $options: 'i'} }", lastName));
        List<Entry> list = mongoTemplate.find(query, Entry.class);
        return ResponseEntity.ok(list);
    }
    @GetMapping("/entries/{id}")
    public ResponseEntity<Entry> entryById(@PathVariable  String id) {
        Entry list = mongoTemplate.findById(id, Entry.class);
        return ResponseEntity.ok(list);
    }
    @PostMapping("/entries/add")
    public ResponseEntity<String> addEntry(@RequestBody Entry entry) {
        mongoTemplate.save(entry);
        return ResponseEntity.ok("Добавлено");
    }
    @PostMapping("/entries/delete")
    public ResponseEntity<String> deleteEntry(@RequestBody Entry entry) {
        mongoTemplate.remove(entry);
        return ResponseEntity.ok("Удалено");
    }
}
