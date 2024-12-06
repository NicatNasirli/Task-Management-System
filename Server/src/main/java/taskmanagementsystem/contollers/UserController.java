package taskmanagementsystem.contollers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import taskmanagementsystem.business.abstracts.UserService;
import taskmanagementsystem.business.requests.CreateUserRequest;
import taskmanagementsystem.entities.User;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/user")
public class UserController {

    private final UserService userService;

    @PostMapping
    public void add(@RequestBody CreateUserRequest createUserRequest) {
        this.userService.add(createUserRequest);
    }


    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id){
        this.userService.delete(id);
    }

    @GetMapping("/getAll")
    public List<User> getAll(){
        return this.userService.getAll();
    }

}
