package taskmanagementsystem.business.abstracts;

import org.springframework.stereotype.Service;
import taskmanagementsystem.business.requests.CreateTaskRequest;
import taskmanagementsystem.business.responses.GetTaskResponse;

import java.util.List;

@Service
public interface TaskService {
    void add(CreateTaskRequest task);
    List<GetTaskResponse> getAll();
    void deleteAllByUser(int userId);
    void updateTaskStatusById(int id, String status);
    void deleteTaskById(int id);
    void deleteAllTaskByUserAndStatus(int userId, String status);
}
