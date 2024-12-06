package taskmanagementsystem.business.concrates;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import taskmanagementsystem.business.abstracts.UserService;
import taskmanagementsystem.business.requests.CreateUserRequest;
import taskmanagementsystem.business.responses.GetUserResponse;
import taskmanagementsystem.dataAccess.abstracts.UserRepository;
import taskmanagementsystem.entities.User;
import taskmanagementsystem.utilities.mapper.ModelMapperService;

import java.util.List;

@Component
@AllArgsConstructor
public class UserManager implements UserService {
    private final UserRepository userRepository;
    private final ModelMapperService modelMapper;

    @Override
    public User findByUsername(String username) {
        return this.userRepository.findByUsername(username);
    }

    @Override
    public void add(CreateUserRequest createUserRequest) {
        User user = this.modelMapper
                .forRequest()
                .map(createUserRequest, User.class);

        this.userRepository.save(user);
    }

    @Override
    public GetUserResponse findByEmailAndPassword(String email, String password) {
        User user = this.userRepository.findByEmailAndPassword(email, password);
        return this.modelMapper
                .forResponse()
                .map(user, GetUserResponse.class);
    }

    @Override
    public void delete(int id) {
        User user = this.userRepository.findById(id);
        this.userRepository.delete(user);
    }

    @Override
    public List<User> getAll() {

        return this.userRepository.findAll();
    }
}
