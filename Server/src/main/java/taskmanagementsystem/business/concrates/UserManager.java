package taskmanagementsystem.business.concrates;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import taskmanagementsystem.business.abstracts.UserService;
import taskmanagementsystem.business.requests.CreateUserRequest;
import taskmanagementsystem.business.requests.UserSignInRequest;
import taskmanagementsystem.business.responses.GetUserResponse;
import taskmanagementsystem.dataAccess.abstracts.RoleRepository;
import taskmanagementsystem.dataAccess.abstracts.UserRepository;
import taskmanagementsystem.entities.Role;
import taskmanagementsystem.entities.User;
import taskmanagementsystem.utilities.mapper.ModelMapperService;

import java.util.List;

@Component
@AllArgsConstructor
public class UserManager implements UserService {

    private final UserRepository userRepository;
    private final ModelMapperService modelMapper;
    private final RoleRepository roleRepository;

    @Override
    public User findByUsername(String username) {
        User user = this.userRepository.findByUsername(username);
        if (user == null) {
            throw new RuntimeException("User does not exists!");
        } else return user;
    }


    @Override
    public void add(CreateUserRequest createUserRequest) {
        Role role = this.roleRepository.findById(1);
        User user = this.modelMapper
                .forRequest()
                .map(createUserRequest, User.class);
        user.setRoles(List.of(role));
        this.userRepository.save(user);
    }


    @Override
    public GetUserResponse findByEmailAndPassword(String email, String password) {
        User user = this.userRepository.findByEmailAndPassword(email, password);
        if (user == null) {
            throw new RuntimeException("User does not exists!");
        } else return this.modelMapper
                .forResponse()
                .map(user, GetUserResponse.class);
    }

    @Override
    public void delete(int id) {
        User user = this.userRepository.findById(id);
        if (user == null) {
            throw new RuntimeException("User does not exist!");
        } else this.userRepository.delete(user);
    }

    @Override
    public List<GetUserResponse> getAll() {
        List<User> users = this.userRepository.findAll();
        if (users.isEmpty()) {
            throw new RuntimeException("User entity is empty");
        } else return users.stream()
                .map(user -> this.modelMapper
                        .forResponse()
                        .map(user, GetUserResponse.class))
                .toList();
    }

    @Override
    public List<Role> getUserRoles(int id) {
        User user = this.userRepository.findById(id);
        if (user == null) {
            throw new RuntimeException("User does not exist!");
        } else return user.getRoles();
    }


    @Override
    public GetUserResponse getById(int id) {
        return this.modelMapper
                .forResponse()
                .map(this.userRepository.findById(id), GetUserResponse.class);
    }

    @Override
    public GetUserResponse signIn(UserSignInRequest userSignInRequest) {
         return this.findByEmailAndPassword(
                 userSignInRequest.getEmail(),userSignInRequest.getPassword());
    }
}
