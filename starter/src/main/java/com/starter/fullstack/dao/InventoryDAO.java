package com.starter.fullstack.dao;

import com.starter.fullstack.api.Inventory;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import javax.annotation.PostConstruct;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.index.Index;
import org.springframework.data.mongodb.core.index.IndexOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.util.Assert;

/**
 * Inventory DAO
 */
public class InventoryDAO {
  private final MongoTemplate mongoTemplate;
  private static final String NAME = "name";
  private static final String PRODUCT_TYPE = "productType";

  /**
   * Default Constructor.
   * 
   * @param mongoTemplate MongoTemplate.
   */
  public InventoryDAO(MongoTemplate mongoTemplate) {
    Assert.notNull(mongoTemplate, "MongoTemplate must not be null.");
    this.mongoTemplate = mongoTemplate;
  }

  /**
   * Constructor to build indexes for rate blackout object
   */
  @PostConstruct
  public void setupIndexes() {
    IndexOperations indexOps = this.mongoTemplate.indexOps(Inventory.class);
    indexOps.ensureIndex(new Index(NAME, Sort.Direction.ASC));
    indexOps.ensureIndex(new Index(PRODUCT_TYPE, Sort.Direction.ASC));
  }

  /**
   * Find All Inventory.
   * 
   * @return List of found Inventory.
   */
  public List<Inventory> findAll() {
    return this.mongoTemplate.findAll(Inventory.class);
  }

  /**
   * Save Inventory.
   * 
   * @param inventory Inventory to Save/Update.
   * @return Created/Updated Inventory.
   */
  public Inventory create(Inventory inventory) {

    // Set ID to null
    inventory.setId(null);

    // insert the passed in inventory into the MongoTemplate
    this.mongoTemplate.insert(inventory);

    // return the updated inventory
    return inventory;
  }

  /**
   * Retrieve Inventory.
   * 
   * @param id Inventory id to Retrieve.
   * @return Found Inventory.
   */
  public Optional<Inventory> retrieve(String id) {
    /* Fetching the Inventory object with the passed in ID */
    Inventory inventory = this.mongoTemplate.findById(id, Inventory.class);
    /* return an 'Optional' wrapped Inventory if one exists */
    return Optional.ofNullable(inventory);
  }

  /**
   * Update Inventory.
   * 
   * @param id        Inventory id to Update.
   * @param inventory Inventory to Update.
   * @return Updated Inventory.
   */
  public Optional<Inventory> update(String id, Inventory inventory) {
    // TODO
    return Optional.empty();
  }

  /**
   * Delete Inventory By Id.
   * 
   * @param ids Id of Inventory.
   * @return Deleted Inventory.
   */
  public List<Inventory> delete(List<String> ids) {

    // List of Inventory objects to be returned
    List<Inventory> invs = new ArrayList<Inventory>();

    // for each ID in the passed in list, find that inventory and delete 
    // it, but add it to the list of inventories to be returned
    for (String id : ids) {
      Query query = new Query(Criteria.where("id").is(id));

      /* Atomically find and remove the Inventory object from the database */
      invs.add(this.mongoTemplate.findAndRemove(query, Inventory.class));
    }
    // return list of deleted inventories
    return invs;
  }
}
