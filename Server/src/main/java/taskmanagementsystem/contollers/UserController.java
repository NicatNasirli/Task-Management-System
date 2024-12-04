package taskmanagementsystem.contollers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import taskmanagementsystem.business.abstracts.UserService;
import taskmanagementsystem.business.requests.CreateUserRequest;
import taskmanagementsystem.business.responses.GetUserResponse;
import taskmanagementsystem.entities.User;

import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/user")
public class UserController {

    private final UserService userService;

    @PostMapping
    public void add(@RequestBody CreateUserRequest createUserRequest) {

        this.userService.add(createUserRequest);
    }

    @GetMapping()
    public GetUserResponse getByEmailAndPassword(@RequestBody Map<String, String> login) {
        String email = login.get("email");
        String password = login.get("password");
        return this.userService.findByEmailAndPassword(email, password);
    }
}
