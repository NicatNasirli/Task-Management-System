package taskmanagementsystem.business.abstracts;

import org.springframework.stereotype.Service;
import taskmanagementsystem.business.requests.CreateUserRequest;
import taskmanagementsystem.business.responses.GetUserResponse;
import taskmanagementsystem.entities.User;

import java.util.List;

@Service
public interface UserService {
    User findByUsername(String username);
    void add(CreateUserRequest createUserRequest);
    GetUserResponse findByEmailAndPassword(String email, String password);
    void delete(int id);
    List<User> getAll();
}
