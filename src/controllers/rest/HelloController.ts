import {Controller} from "@tsed/di";
import {Get} from "@tsed/schema";

@Controller("/hello")
export class HelloController {
  @Get("/")
  get() {
    return "hello";
  }
}
