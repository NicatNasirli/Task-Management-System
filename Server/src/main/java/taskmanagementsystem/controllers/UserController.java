package taskmanagementsystem.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import taskmanagementsystem.business.abstracts.UserService;
import taskmanagementsystem.business.requests.CreateUserRequest;
import taskmanagementsystem.business.requests.UserSignInRequest;
import taskmanagementsystem.business.responses.GetUserResponse;
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

    @PostMapping("/signUp")
    public ResponseEntity<String> signUp(@RequestBody CreateUserRequest createUserRequest){
        this.userService.add(createUserRequest);
        return new ResponseEntity<>("User created!",HttpStatus.CREATED);
    }

    @PostMapping("/signIn")
    public ResponseEntity<GetUserResponse> signIn(@RequestBody UserSignInRequest userSignInRequest){
        return ResponseEntity.ok(this.userService.signIn(userSignInRequest));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable int id){
        this.userService.delete(id);
        return new ResponseEntity<>("User successfully deleted!",HttpStatus.OK);
    }

    @GetMapping("/getAll")
    public List<GetUserResponse> getAll(){
        return this.userService.getAll();
    }

    @GetMapping("/{id}")
    public GetUserResponse getUser(@PathVariable int id){
        return this.userService.getById(id);
    }

}
