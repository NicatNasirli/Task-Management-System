package taskmanagementsystem.dataAccess.abstracts;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import taskmanagementsystem.entities.Task;
import taskmanagementsystem.entities.User;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    void deleteAllByUser(User user);
    List<Task> findAllByUser(User user);
}
