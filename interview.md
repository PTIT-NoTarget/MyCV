# Câu hỏi phỏng vấn — Ngô Đăng Hán (Fullstack / Java / Spring)

Tài liệu gộp: **câu hỏi theo CV**, **câu hỏi nền tảng & framework** (Baeldung, Oracle/OpenJDK, Spring), **design patterns (GoF & enterprise)**, và **tình huống nghiệp vụ khó**. Hãy điền chi tiết thật vào chỗ `[tự điền]`.

---

## Mục lục

1. [Java — nền tảng & ngôn ngữ](#1-java--nền-tảng--ngôn-ngữ)
2. [Java — Collections](#2-java--collections)
3. [Java — Đa luồng & đồng bộ](#3-java--đa-luồng--đồng-bộ)
4. [JVM, bộ nhớ & GC](#4-jvm-bộ-nhớ--gc)
5. [Spring & Spring Boot](#5-spring--spring-boot)
6. [Design patterns (mẫu thiết kế)](#6-design-patterns-mẫu-thiết-kế)
7. [JPA / Hibernate & cơ sở dữ liệu](#7-jpa--hibernate--cơ-sở-dữ-liệu)
8. [REST API, bảo mật, tích hợp](#8-rest-api-bảo-mật-tích-hợp)
9. [Redis](#9-redis)
10. [Apache Kafka](#10-apache-kafka)
11. [Elasticsearch](#11-elasticsearch)
12. [WebSocket](#12-websocket)
13. [Microservices](#13-microservices)
14. [Front-end & DevOps (theo CV)](#14-front-end--devops-theo-cv)
15. [Kotlin (nếu hỏi thêm)](#15-kotlin-nếu-hỏi-thêm)
16. [Theo CV — giới thiệu, học vấn, kỹ năng](#16-theo-cv--giới-thiệu-học-vấn-kỹ-năng)
17. [Theo CV — công ty & dự án](#17-theo-cv--công-ty--dự-án)
18. [Hành vi & câu hỏi tổng hợp](#18-hành-vi--câu-hỏi-tổng-hợp)
19. [Nghiệp vụ & thiết kế hệ thống (khó)](#19-nghiệp-vụ--thiết-kế-hệ-thống-khó)

---

## 1. Java — nền tảng & ngôn ngữ

**Câu hỏi:** JDK, JRE, JVM khác nhau thế nào?

**Gợi ý trả lời:**  
- **JVM (Java Virtual Machine):** máy ảo thực thi bytecode (`.class`), cung cấp bộ nhớ, GC, JIT.  
- **JRE (Java Runtime Environment):** JVM + thư viện chuẩn để **chạy** ứng dụng (không gồm công cụ biên dịch đầy đủ cho dev).  
- **JDK (Java Development Kit):** JRE + công cụ dev (`javac`, `javadoc`, `jcmd`, v.v.) để **phát triển và chạy**. Hiện thường dùng JDK (ví dụ Temurin, Oracle JDK).

---

**Câu hỏi:** `javac` compile ra gì? Bytecode là gì?

**Gợi ý trả lời:**  
`javac` biên dịch mã nguồn `.java` thành **bytecode** (tập lệnh cho JVM, không phải mã máy CPU trực tiếp). JVM nạp `.class`, verify, rồi JIT biên dịch hotspot sang native để tối ưu.

---

**Câu hỏi:** `public static void main(String[] args)` — giải thích từng từ khóa.

**Gợi ý trả lời:**  
`public`: JVM gọi được entry point; `static`: thuộc lớp, không cần instance; `void`: không trả giá trị cho caller ngoài; `String[] args`: tham số dòng lệnh.

---

**Câu hỏi:** `==` và `equals()` khác nhau thế nào?

**Gợi ý trả lời:**  
- Với **tham chiếu**: `==` so sánh **địa chỉ** (cùng object hay không).  
- `equals()` mặc định giống `==`; lớp như `String`, `Integer` **override** để so sánh **giá trị**. Với String literal còn liên quan **string pool**.

---

**Câu hỏi:** Hợp đồng `equals()` và `hashCode()`? Vi phạm thì HashMap sao?

**Gợi ý trả lời:**  
Nếu `a.equals(b)` thì `a.hashCode() == b.hashCode()`. Ngược lại không bắt buộc hai object khác `equals` phải khác `hashCode`, nhưng nên để giảm va đập bucket. Nếu override `equals` mà không `hashCode`, các cấu trúc dùng hash (**HashMap**, **HashSet**) cho kết quả sai hoặc không tìm được key.

---

**Câu hỏi:** `String` immutable — tại sao và lợi ích?

**Gợi ý trả lời:**  
Nội dung không đổi sau khi tạo; mỗi “sửa” tạo object mới. Lợi ích: an toàn khi dùng làm key/cache, string pool, thread-safe đọc (không cần lock cho đọc đơn giản).

---

**Câu hỏi:** String pool là gì?

**Gợi ý trả lời:**  
Vùng trong heap (Meta/heap tùy phiên bản) lưu literal và `intern()`. Literal cùng nội dung có thể trỏ cùng instance — tiết kiệm bộ nhớ; cần hiểu khi so sánh `==` vs `equals`.

---

**Câu hỏi:** `String`, `StringBuilder`, `StringBuffer` khi nào dùng?

**Gợi ý trả lời:**  
- Nối chuỗi **nhiều lần trong vòng lặp**: `StringBuilder` (không đồng bộ, nhanh).  
- **Đa luồng** cùng sửa buffer: `StringBuffer` (methods `synchronized`).  
- `String`: đơn giản, immutable; tránh `+` trong loop lớn.

---

**Câu hỏi:** `final` cho class, method, biến nghĩa là gì?

**Gợi ý trả lời:**  
Class `final` không cho extend; method `final` không override được; biến tham chiếu `final` không đổi **tham chiếu** (object vẫn có thể đổi trạng thái nếu mutable).

---

**Câu hỏi:** Abstract class vs interface (Java 8+)?

**Gợi ý trả lời:**  
Abstract class: có state (field), constructor, một phần implementation; đơn kế thừa. Interface: hợp đồng hành vi; từ Java 8 có `default`/`static` method; class có thể implement nhiều interface. Chọn theo “is-a” vs “capability”.

---

**Câu hỏi:** Overload vs override?

**Gợi ý trả lời:**  
Overload: cùng tên method, khác tham số, trong **cùng lớp** (hoặc liên quan). Override: lớp con thay thế implementation method instance của lớp cha, cùng chữ ký; cần quy tắc `@Override`, covariant return.

---

**Câu hỏi:** `try-catch-finally` và `try-with-resources`?

**Gợi ý trả lời:**  
`try-with-resources` (Java 7+): tự đóng `AutoCloseable` (InputStream, Connection…), tránh leak; `finally` vẫn dùng khi cần logic dọn dẹp không gắn close.

---

**Câu hỏi:** `Error` vs `Exception`? Checked vs unchecked?

**Gợi ý trả lời:**  
`Error` (ví dụ `OutOfMemoryError`): lỗi nghiêm trọng, thường không bắt. `Exception`: `RuntimeException` và subclass là **unchecked** (không bắt buộc khai báo throws); còn lại **checked** (bắt buộc khai báo hoặc catch). Thiết kế hiện đại thường ưu unchecked cho API nội bộ, tránh lồng throws lan rộng.

---

**Câu hỏi:** Generics — type erasure là gì?

**Gợi ý trả lời:**  
Thông tin generic bị xóa ở bytecode; runtime chỉ thấy raw type (với bounds tương ứng). Hạn chế: không `new T()`, không `instanceof` trên type parameter thuần. Dùng để an toàn kiểu tại compile-time.

---

**Câu hỏi:** `List<? extends T>` và `List<? super T>` (PECS)?

**Gợi ý trả lời:**  
Producer **extends**, Consumer **super**. `extends`: đọc an toàn T trở lên; `super`: ghi an toàn T trở xuống. Giúp API linh hoạt mà vẫn type-safe.

---

**Câu hỏi:** Enum an toàn thread và singleton?

**Gợi ý trả lời:**  
Enum singleton được JVM đảm bảo một instance; thread-safe khởi tạo; tránh reflection/phân tích phức tạp hơn so với double-check locking thủ công.

---

**Câu hỏi:** Serialization trong Java — `serialVersionUID`, `transient`?

**Gợi ý trả lời:**  
`serialVersionUID` cố định phiên bản schema; đổi không khớp gây `InvalidClassException`. `transient` bỏ qua field khi serialize. Trong microservices thường ưu JSON/Protobuf hơn Java serialization.

---

**Câu hỏi:** `Comparable` vs `Comparator`?

**Gợi ý trả lời:**  
`Comparable`: thứ tự “tự nhiên” của lớp (`compareTo`). `Comparator`: thứ tự tách riêng, nhiều cách sort cho cùng lớp (`TreeSet`, `sort`).

---

**Câu hỏi:** Stream API — `map` vs `flatMap`, `reduce`, lazy?

**Gợi ý trả lời:**  
`map` 1-1; `flatMap` “dẹt” Stream của Stream. `reduce` gộp. Intermediate operations lazy đến khi gặp terminal operation; có thể short-circuit (`findFirst`).

---

**Câu hỏi:** Optional — dùng đúng/không nên lạm dụng thế nào?

**Gợi ý trả lời:**  
Phù hợp **return** có thể vắng; tránh field, tham số dài; không dùng `get()` mù; ưu `orElse`, `orElseGet`, `ifPresent`.

---

## 2. Java — Collections

**Câu hỏi:** Phân cấp `Collection` — `List`, `Set`, `Queue`, `Map`?

**Gợi ý trả lời:**  
`List` có thứ tự, cho phép trùng; `Set` không trùng; `Queue` FIFO/priority; `Map` key-value (không extends Collection). Chọn theo truy cập theo index, duy nhất, hay lookup key.

---

**Câu hỏi:** `ArrayList` vs `LinkedList` — cấu trúc, độ phức tạp, khi nào dùng?

**Gợi ý trả lời:**  
- **ArrayList:** mảng động, **random access O(1)**; chèn/xóa giữa mảng cần dịch chuyển **O(n)**; cache-friendly.  
- **LinkedList:** danh sách đôi, chèn/xóa tại iterator **O(1)** nếu đã có vị trí; **get(index)** **O(n)**. Thực tế ArrayList dùng nhiều hơn; LinkedList ít hơn trừ queue/deque nặng hoặc nhiều insert giữa với iterator.

---

**Câu hỏi:** `Vector` và `Stack` — có nên dùng?

**Gợi ý trả lời:**  
`Vector` đồng bộ legacy; thường thay bằng `ArrayList` + `Collections.synchronizedList` hoặc `CopyOnWriteArrayList` tùy bài toán. `Stack` extend `Vector` — nên dùng `Deque` (`ArrayDeque`) cho stack hiện đại.

---

**Câu hỏi:** `HashMap` hoạt động bên trong (Java 8+)?

**Gợi ý trả lời:**  
Mảng **bucket**; index từ `hash` đã xáo trộn `(n-1) & hash`. Va chạm: **danh sách liên kết**; nếu số phần tử trong bucket ≥ 8 và capacity đủ lớn, chuyển **cây đỏ-đen** để worst-case tốt hơn. **Resize** khi số entry > `capacity * load factor` (mặc định 0.75).

---

**Câu hỏi:** `HashMap` cho phép null key/value?

**Gợi ý trả lời:**  
Một `null` key (đặt ở bucket đặc biệt), nhiều null value. `ConcurrentHashMap` **không** cho null key/value (tránh ambiguity đa luồng).

---

**Câu hỏi:** `HashMap` vs `LinkedHashMap` vs `TreeMap`?

**Gợi ý trả lời:**  
- **HashMap:** không đảm bảo thứ tự; **O(1)** trung bình cho get/put.  
- **LinkedHashMap:** thứ tự chèn hoặc access-order (LRU cache).  
- **TreeMap:** **Red-Black tree**, key **sorted**; **O(log n)**; cần `Comparable` hoặc `Comparator`.

---

**Câu hỏi:** `HashSet` implement thế nào?

**Gợi ý trả lời:**  
Thường backed bởi `HashMap` (object làm dummy value); `add/remove/contains` phụ thuộc `hashCode`/`equals` của phần tử.

---

**Câu hỏi:** `PriorityQueue` — heap, độ phức tạp?

**Gợi ý trả lời:**  
Heap nhị phân; offer/poll **O(log n)**; peek **O(1)**; không thread-safe; `ConcurrentSkipListMap`/`PriorityBlockingQueue` cho đa luồng tùy case.

---

**Câu hỏi:** Fail-fast vs fail-safe iterator?

**Gợi ý trả lời:**  
Fail-fast (`ArrayList`, `HashMap`): ném `ConcurrentModificationException` nếu cấu trúc đổi khi iterate (trừ qua iterator.remove). Fail-safe (copy): iterate trên snapshot — không exception nhưng có thể không thấy thay đổi mới (ví dụ `ConcurrentHashMap` iterator yếu consistency).

---

**Câu hỏi:** `Collections.unmodifiableXxx` vs immutable collection (Java 9+ `List.of`)?

**Gợi ý trả lời:**  
Unmodifiable: wrapper, nếu giữ reference tới collection gốc có thể vẫn đổi được nội dung bên trong object mutable. `List.of` tạo immutable thật (không thêm/bớt).

---

## 3. Java — Đa luồng & đồng bộ

**Câu hỏi:** Process vs Thread trong Java?

**Gợi ý trả lời:**  
Process: không gian địa chỉ riêng; Thread: đơn vị thực thi nhẹ trong process, **chia heap** (cùng JVM), stack riêng.

---

**Câu hỏi:** Cách tạo thread? `Runnable` vs `Callable`?

**Gợi ý trả lời:**  
Extend `Thread` hoặc `new Thread(runnable)`. `Callable` có return và throw checked exception; dùng với `ExecutorService.submit` → `Future`.

---

**Câu hỏi:** `ExecutorService`, `ThreadPoolExecutor` — tham số core/max pool, queue?

**Gợi ý trả lời:**  
Core threads sống lâu; max khi queue đầy; `RejectedExecutionHandler` khi quá tải. Chọn pool size theo CPU-bound vs IO-bound (IO thường nhiều thread hơn). Tránh `CachedThreadPool` không giới hạn cho tác vụ dài.

---

**Câu hỏi:** `synchronized` — monitor, static vs instance?

**Gợi ý trả lời:**  
` synchronized` trên method instance khóa **this**; static khóa **Class object**. Khối `synchronized(obj)` khóa object chỉ định. Đảm bảo **mutual exclusion** cùng monitor; có thể gây deadlock nếu thứ tự khóa không nhất quán.

---

**Câu hỏi:** `volatile` làm gì?

**Gợi ý trả lời:**  
Đảm bảo **hiện** thay đổi biến giữa thread (không cache thread-local vô hạn) và **happens-before** với ghi → đọc. Không thay thế atomic cho `i++` (read-modify-write).

---

**Câu hỏi:** `java.util.concurrent.atomic` — `AtomicInteger`, CAS?

**Gợi ý trả lời:**  
Thao tác atomic dựa trên **CAS** (compare-and-swap) phần cứng; phù hợp bộ đếm đơn giản; contention cao có thể kém hiệu quả (spin).

---

**Câu hỏi:** `ReentrantLock` vs `synchronized`?

**Gợi ý trả lời:**  
`ReentrantLock`: tryLock, timed lock, fair mode, có thể interrupt đợi; cần `unlock` trong `finally`. `synchronized`: đơn giản, JVM tối ưu tốt. Ưu tiên synchronized khi đủ; lock khi cần linh hoạt.

---

**Câu hỏi:** `ReadWriteLock`?

**Gợi ý trả lời:**  
Nhiều reader đồng thời, writer độc quyền; phù hợp đọc >> ghi (cache).

---

**Câu hỏi:** `CountDownLatch`, `CyclicBarrier`, `Semaphore`?

**Gợi ý trả lời:**  
Latch: chờ N sự kiện một lần; Barrier: vòng lặp các thread gặp nhau tại điểm; Semaphore: giới hạn số thread vào vùng tài nguyên.

---

**Câu hỏi:** `CompletableFuture` — compose async?

**Gợi ý trả lời:**  
Xâu chuỗi bất đồng bộ `thenApply`, `thenCompose`, `allOf`; chọn `Executor` phù hợp, tránh block trên common ForkJoin pool.

---

**Câu hỏi:** Deadlock — điều kiện, cách tránh?

**Gợi ý trả lời:**  
Chờ vòng tròn tài nguyên; tránh bằng thứ tự khóa cố định, timeout (`tryLock`), giảm nested lock.

---

**Câu hỏi:** `ThreadLocal` — dùng để làm gì? Rủi ro (pool thread)?

**Gợi ý trả lời:**  
Mỗi thread có bản sao biến (context request, user). Với thread pool phải **`remove()`** sau request để tránh leak và “nhiễm” giữa request.

---

**Câu hỏi:** `ConcurrentHashMap` khác `HashMap` + synchronized?

**Gợi ý trả lời:**  
Segment/bucket-level locking (phiên bản cụ thể có chi tiết khác theo JDK), cho phép đọc đồng thời nhiều hơn; không lock toàn map như `Collections.synchronizedMap` cho mọi thao tác.

---

## 4. JVM, bộ nhớ & GC

**Câu hỏi:** Vùng nhớ heap, stack, metaspace?

**Gợi ý trả lời:**  
Stack: frame mỗi method, biến cục bộ, tham chiếu. Heap: object; chia **Young** (Eden, Survivor) và **Old**. Metaspace: class metadata (thay PermGen cũ).

---

**Câu hỏi:** GC cơ bản — Minor vs Major/Full?

**Gợi ý trả lời:**  
Minor: thu gom Young (copying nhanh). Major/Full: liên quan Old hoặc toàn heap khi cần. STW (stop-the-world) tùy collector và phase.

---

**Câu hỏi:** G1, ZGC, Shenandoah — ý tưởng chung?

**Gợi ý trả lời:**  
G1 chia heap region, ưu tiên vùng rác nhiều; ZGC/Shenandoah hướng tới latency thấp (không đi sâu tên thuật toán trừ khi senior). Thực hành: quan sát GC log, `-Xmx/-Xms`, metaspace.

---

**Câu hỏi:** `StrongReference`, `SoftReference`, `WeakReference`, `PhantomReference`?

**Gợi ý trả lời:**  
Strong: không GC nếu còn reachable. Soft: thu khi thiếu bộ nhớ (cache). Weak: GC sớm hơn (WeakHashMap). Phantom: dùng cho cleanup sau khi finalize path; ít gặp hơn trong app thường.

---

**Câu hỏi:** Công cụ phân tích: heap dump, MAT, async profiler?

**Gợi ý trả lời:**  
`jcmd`, `jmap`, VisualVM, Eclipse MAT cho leak; async-profiler/JFR cho CPU và allocation — nêu kinh nghiệm thực tế nếu có.

---

## 5. Spring & Spring Boot

**Câu hỏi:** IoC (Inversion of Control) là gì?

**Gợi ý trả lời:**  
Đảo ngược quyền điều khiển tạo phụ thuộc: **container** (ApplicationContext) tạo và “cắm” bean thay vì code tự `new` mọi thứ — giảm coupling, dễ test (mock bean).

---

**Câu hỏi:** DI (Dependency Injection) — constructor vs setter vs field?

**Gợi ý trả lời:**  
**Constructor injection** được Spring khuyến nghị: immutable, bắt buộc dependency, dễ test. Setter linh hoạt nhưng có thể để object ở trạng thái chưa đủ. Field `@Autowired` tiện nhưng khó test và ẩn dependency.

---

**Câu hỏi:** `@Component`, `@Service`, `@Repository`, `@Controller` khác nhau?

**Gợi ý trả lời:**  
Đều là **stereotype** `@Component`; ngữ nghĩa: `@Repository` thêm exception translation persistence; `@Service` tầng nghiệp vụ; `@Controller`/`@RestController` web. Hành vi scan giống nhau về cơ bản.

---

**Câu hỏi:** `@Bean` trong `@Configuration` vs `@Component` class?

**Gợi ý trả lời:**  
`@Bean` method: factory do bạn kiểm soát (third-party lib). `@Configuration` **proxy** để `@Bean` method gọi lẫn nhau vẫn singleton. `@Component` class: bean là class đó.

---

**Câu hỏi:** Bean scope: singleton, prototype, request, session?

**Gợi ý trả lời:**  
**Singleton** (mặc định): một instance mỗi context. **Prototype**: mỗi lần get bean mới — cẩn thận inject prototype vào singleton (cần `ObjectProvider` hoặc lookup). Request/session: trong web app.

---

**Câu hỏi:** Vòng đời bean — `BeanPostProcessor`, `InitializingBean`, `@PostConstruct`?

**Gợi ý trả lời:**  
Instantiation → populate dependency → `BeanPostProcessor.before` → init (`@PostConstruct`, `afterPropertiesSet`) → `after` → bean sẵn sàng → destroy (`@PreDestroy`) khi context đóng.

---

**Câu hỏi:** `@Autowired` — bắt buộc, `@Qualifier`, `@Primary`?

**Gợi ý trả lời:**  
Mặc định required=true; nhiều implementation cùng type cần `@Qualifier` hoặc `@Primary`. Tránh ambiguous injection.

---

**Câu hỏi:** `@ConfigurationProperties` — binding cấu hình?

**Gợi ý trả lời:**  
Type-safe config từ `application.yml`; hỗ trợ validation; tách khỏi `@Value` rải rác.

---

**Câu hỏi:** Spring Boot auto-configuration hoạt động ra sao (ý tưởng)?

**Gợi ý trả lời:**  
`META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports` (Boot 3) nạp class có `@ConditionalOnClass`, `@ConditionalOnMissingBean` — chỉ cấu hình khi classpath có dependency và chưa có bean tùy chỉnh.

---

**Câu hỏi:** `@SpringBootApplication` gồm gì?

**Gợi ý trả lời:**  
`@Configuration` + `@EnableAutoConfiguration` + `@ComponentScan` (mặc định package hiện tại và con).

---

**Câu hỏi:** Spring MVC flow — DispatcherServlet?

**Gợi ý trả lời:**  
Request → `DispatcherServlet` → handler mapping → interceptor → controller → view resolve hoặc message converter (REST) → response.

---

**Câu hỏi:** `@ControllerAdvice` / `@ExceptionHandler`?

**Gợi ý trả lời:**  
Xử lý exception tập trung, chuẩn hóa body lỗi (mã HTTP, mã nghiệp vụ).

---

**Câu hỏi:** Validation — `@Valid`, `@Validated`, Bean Validation?

**Gợi ý trả lời:**  
Hibernate Validator; nhóm validation (`groups`); lỗi trả `MethodArgumentNotValidException`.

---

**Câu hỏi:** AOP — Aspect, Pointcut, Advice (Before/After/Around)?

**Gợi ý trả lời:**  
Tách **cross-cutting** (log, audit, transaction boundary). Around có thể bọc toàn bộ joinpoint. Trong Spring, proxy JDK (interface) hoặc CGLIB (class). **self-invocation** trong cùng class không qua proxy → `@Transactional`/AOP không áp — cần tách bean hoặc `AopContext`.

---

**Câu hỏi:** `@Transactional` — propagation, isolation, rollback?

**Gợi ý trả lời:**  
- **Propagation:** `REQUIRED` (tham gia hoặc tạo mới), `REQUIRES_NEW` (suspend và tạo transaction mới), `NESTED` (savepoint — cần DB hỗ trợ), `MANDATORY`, `SUPPORTS`, `NOT_SUPPORTED`, `NEVER`.  
- **Isolation:** READ_COMMITTED, REPEATABLE_READ, SERIALIZABLE — trade-off phantom/lock.  
- **Rollback:** mặc định chỉ unchecked/runtime; có thể `rollbackFor = Exception.class`.

---

**Câu hỏi:** `@Async` — điều kiện hoạt động?

**Gợi ý trả lời:**  
Cần `@EnableAsync`; gọi từ **bean khác** qua proxy; cấu hình `Executor`; hiểu exception handling async.

---

**Câu hỏi:** Spring Security filter chain — ý tưởng?

**Gợi ý trả lời:**  
Chuỗi `Filter`: authentication, authorization, CSRF (session), resource server JWT; cấu hình `SecurityFilterChain` (Boot 3).

---

**Câu hỏi:** OAuth2 Resource Server với JWT?

**Gợi ý trả lời:**  
Validate signature JWT (JWK URI), issuer, audience; extract authorities vào `SecurityContext`.

---

**Câu hỏi:** Actuator — endpoint, bảo mật?

**Gợi ý trả lời:**  
Health, metrics, env — **không** expose public; giới hạn network, auth, chỉ bật cần thiết.

---

**Câu hỏi:** Spring Boot 2 vs 3 — điểm chính?

**Gợi ý trả lời:**  
Baseline **Java 17+**, **Jakarta EE** namespace (`javax.*` → `jakarta.*`), native hints (optional); migration cần đổi dependency và cấu hình security.

---

## 6. Design patterns (mẫu thiết kế)

*Gồm nhóm **GoF** (Gang of Four) và các mẫu thường gặp trong Java/Spring. Trả lời kèm ví dụ ngắn từ dự án thực tế nếu được hỏi “em đã dùng ở đâu”.*

### Nhận biết chung

**Câu hỏi:** Design pattern là gì? Khác **principle** (SOLID) thế nào?

**Gợi ý trả lời:**  
**Pattern** là giải pháp **tái sử dụng** cho bài toán thiết kế lặp lại (tên, cấu trúc, trade-off). **SOLID** là **nguyên tắc** hướng dẫn thiết kế tốt — pattern thường **thỏa** một phần SOLID (ví dụ Strategy mở/đóng).

---

**Câu hỏi:** Phân loại GoF: **Creational**, **Structural**, **Behavioral**?

**Gợi ý trả lời:**  
- **Creational:** cách **tạo object** (Singleton, Factory, Builder…).  
- **Structural:** **tổ chức lớp/object** (Adapter, Decorator, Proxy…).  
- **Behavioral:** **giao tiếp & trách nhiệm** giữa object (Strategy, Observer, Template…).

---

### Creational (nhóm tạo dựng)

**Câu hỏi:** **Singleton** — mục đích? Cách thread-safe trong Java?

**Gợi ý trả lời:**  
Đảm bảo **một instance** (config, pool, logger). Thread-safe: **enum singleton** (khuyến nghị), hoặc static holder, hoặc `synchronized`/`volatile` double-check (ít dùng hơn). Lưu ý Singleton trong **Spring** mặc định là singleton **theo container** — khác GoF thuần.

---

**Câu hỏi:** **Factory Method** vs **Abstract Factory**?

**Gợi ý trả lời:**  
**Factory Method:** subclass quyết định class cụ thể được tạo (một dòng sản phẩm). **Abstract Factory:** họ **factory** tạo **họ object liên quan** (UI toolkit đồng bộ theme). Spring `BeanFactory` / `@Bean` method có tinh thần factory (tạo object theo cấu hình).

---

**Câu hỏi:** **Builder** — khi nào dùng? Lombok `@Builder`?

**Gợi ý trả lời:**  
Khi object có **nhiều tham số tùy chọn**, tránh constructor dài/telescoping. Builder cho phép bước từng bước, đọc dễ. `StringBuilder`, HTTP client builder cũng là builder. Immutability sau khi `build()`.

---

**Câu hỏi:** **Prototype** — clone object?

**Gợi ý trả lời:**  
Tạo object mới bằng **sao chép** prototype (tránh `new` nặng). Java `clone()` hoặc copy constructor; chú ý **deep vs shallow copy** với reference.

---

### Structural (nhóm cấu trúc)

**Câu hỏi:** **Adapter** — ví dụ thực tế?

**Gợi ý trả lời:**  
Bọc interface không tương thích thành interface client mong đợi. Ví dụ: adapter SDK đối tác cũ sang interface nội bộ; `java.io.InputStreamReader` (byte ↔ char). **Tích hợp SQL Accounting / VNPT** có thể mô tả như adapter từng vendor.

---

**Câu hỏi:** **Decorator** vs **Subclass**?

**Gợi ý trả lời:**  
Decorator **bọc** object gốc, thêm hành vi **lúc runtime** và có thể xếp chồng nhiều lớp; subclass cố định compile-time. Ví dụ Java I/O: `BufferedInputStream` bọc `FileInputStream`.

---

**Câu hỏi:** **Proxy** — Virtual, Protection, Remote?

**Gợi ý trả lời:**  
**Virtual:** lazy load object nặng. **Protection:** kiểm tra quyền trước khi gọi thật. **Remote:** stub RPC. Spring **AOP** dùng **dynamic proxy** (JDK interface / CGLIB) — là **proxy** bọc bean để thêm transaction, log.

---

**Câu hỏi:** **Facade** — khác Adapter?

**Gợi ý trả lời:**  
**Facade** **đơn giản hóa** một hệ con phức tạp bằng một cổng gọi cao cấp (API gọn cho client). Adapter **chuyển** interface; Facade **ẩn** độ phức tạp nhiều class. Service layer đôi khi đóng vai facade cho nhiều repository.

---

**Câu hỏi:** **Composite** — cây (tree) phần tử?

**Gợi ý trả lời:**  
Client xử lý **leaf** và **composite** thống nhất qua interface chung (ví dụ UI component, thư mục/file). Dùng khi cấu trúc phân cấp đồng nhất.

---

**Câu hỏi:** **Flyweight** — chia sẻ trạng thái?

**Gợi ý trả lời:**  
Tách **intrinsic** (chia sẻ) vs **extrinsic** (truyền vào) để tiết kiệm bộ nhớ khi có **rất nhiều** object giống nhau (ký tự trong editor, icon).

---

**Câu hỏi:** **Bridge** — tách abstraction và implementation?

**Gợi ý trả lời:**  
Cho phép abstraction và implementation **độc lập** tiến hóa (ví dụ `Shape` + `DrawingAPI` riêng). Ít hỏi sâu junior nhưng hay gặp ở câu hỏi “tách interface khỏi platform”.

---

### Behavioral (nhóm hành vi)

**Câu hỏi:** **Strategy** — khác if-else dài?

**Gợi ý trả lời:**  
Đóng gói thuật toán/hành vi vào các class **interchangeable**, context gọi qua interface. Dễ mở rộng (Open/Closed) thay vì sửa một method khổng lồ. Ví dụ: nhiều cách tính **phí vận chuyển**, **giảm giá**.

---

**Câu hỏi:** **Template Method** — hook method?

**Gợi ý trả lời:**  
Lớp abstract định **khung thuật toán** (`final` method gọi các bước), subclass **override** từng bước. Spring `JdbcTemplate`, `RestTemplate` callback có tinh thần template (framework gọi hook của bạn).

---

**Câu hỏi:** **Observer** / **Publish–Subscribe**?

**Gợi ý trả lời:**  
Subject thông báo thay đổi tới danh sách observer. Pub-sub **giải couple** hơn (topic, message broker). Java `PropertyChangeListener`; frontend reactive; **Kafka consumer** là dạng pub-sub ở hạ tầng.

---

**Câu hỏi:** **Chain of Responsibility** — servlet filter, approval flow?

**Gợi ý trả lời:**  
Request đi qua **chuỗi handler**; handler xử lý hoặc chuyển tiếp. **Spring Security filter chain**; luồng **phê duyệt** (Transport Management với annotation/AOP có thể minh họa chuỗi bước).

---

**Câu hỏi:** **Command** — undo, queue?

**Gợi ý trả lời:**  
Đóng gói request thành object — hỗ trợ **undo**, log, queue job. `Runnable` là dạng command đơn giản.

---

**Câu hỏi:** **State** vs **Strategy**?

**Gợi ý trả lời:**  
Cả hai composition. **State:** object **đổi class hành vi** theo trạng thái nội bộ (finite state machine). **Strategy:** client **chọn** thuật toán từ bên ngoài, ít “tự chuyển” trạng thái như State.

---

**Câu hỏi:** **Iterator** — duyệt collection ẩn cấu trúc?

**Gợi ý trả lời:**  
`java.util.Iterator`, `for-each` — tách duyệt khỏi `List`/`Set` cụ thể.

---

**Câu hỏi:** **Mediator** — chat room, không nói chuyện trực tiếp?

**Gợi ý trả lời:**  
Các colleague giao tiếp qua **mediator** thay vì phụ thuộc lẫn nhau — giảm kết nối N². Ứng dụng UI phức tạp hoặc orchestration nhẹ.

---

**Câu hỏi:** **Memento** — undo snapshot?

**Gợi ý trả lời:**  
Lưu trạng thái object để **khôi phục** mà không lộ nội bộ (caretaker giữ memento).

---

**Câu hỏi:** **Visitor** — thao tác trên cây phần tử mà không sửa class?

**Gợi ý trả lời:**  
Tách **algorithm** khỏi cấu trúc element; thêm visitor mới không sửa element (nhưng thường phải có `accept` trên element). Ít dùng hơn trong app CRUD thường.

---

### Mẫu kiến trúc / enterprise (hay hỏi kèm Spring)

**Câu hỏi:** **Dependency Injection** có phải GoF pattern không?

**Gợi ý trả lời:**  
Không thuần GoF nhưng liên quan **Inversion of Control**: container **inject** dependency thay vì class tự `new` — cốt lõi Spring.

---

**Câu hỏi:** **Repository** pattern và JPA?

**Gợi ý trả lời:**  
Trừu tượng hóa **truy cập dữ liệu** (collection-like API), ẩn SQL/JPA. `JpaRepository` là framework hỗ trợ pattern này.

---

**Câu hỏi:** **DAO** khác Repository?

**Gợi ý trả lời:**  
DAO thường **sát persistence** (table/SQL); Repository **gần domain** hơn (aggregate). Thực tế ranh giới mờ; quan trọng là một lớp tách data access khỏi nghiệp vụ.

---

**Câu hỏi:** **DTO** — vì sao không trả Entity trực tiếp?

**Gợi ý trả lời:**  
**Data Transfer Object** cố định hợp đồng API, tránh lộ lazy proxy, giảm payload, versioning — không phải GoF nhưng rất hay hỏi.

---

**Câu hỏi:** **MVC** — Spring MVC mapping?

**Gợi ý trả lời:**  
Model–View–Controller: tách concern. `DispatcherServlet` là **Front Controller**; Controller xử lý request; View/JSON response.

---

**Câu hỏi:** **Front Controller**?

**Gợi ý trả lời:**  
Một điểm vào xử lý chung (routing, auth) trước khi tới handler cụ thể — chính là servlet dispatcher.

---

**Câu hỏi:** **Null Object** pattern?

**Gợi ý trả lời:**  
Thay `null` bằng object “no-op” implement cùng interface — tránh `NullPointerException` và if-null rải rác. Optional trong API là hướng khác.

---

**Câu hỏi:** **Object Pool** — kết nối DB?

**Gợi ý trả lời:**  
Tái sử dụng object tốn kém tạo (connection pool **HikariCP**). Khác Singleton: pool có **nhiều** instance.

---

### Anti-pattern & câu hỏi tình huống

**Câu hỏi:** **Singleton** khi nào trở thành anti-pattern?

**Gợi ý trả lời:**  
Global state khó test, che giấu dependency, vi phạm SRP nếu làm “thùng rác” tiện ích. Spring singleton có scope rõ ràng vẫn ổn hơn static God singleton.

---

**Câu hỏi:** **God class / Spaghetti code**?

**Gợi ý trả lời:**  
Một lớp làm quá nhiều — tách theo responsibility, service nhỏ, pattern chỉ là công cụ.

---

**Câu hỏi:** Khi nào **không** nên dùng pattern?

**Gợi ý trả lời:**  
YAGNI — over-engineer cho bài toán nhỏ; ưu tiên code đọc được và test được hơn tên pattern.

---

## 7. JPA / Hibernate & cơ sở dữ liệu

**Câu hỏi:** EntityManager, Persistence Context?

**Gợi ý trả lời:**  
Context quản lý entity **managed** trong transaction; dirty checking flush; `detach/clear` ảnh hưởng lazy load.

---

**Câu hỏi:** `LAZY` vs `EAGER`?

**Gợi ý trả lời:**  
Mặc định `@ManyToOne` eager có thể gây load thừa; `@OneToMany` lazy — tránh N+1 bằng fetch join, `@EntityGraph`, batch size.

---

**Câu hỏi:** N+1 query — ví dụ và cách xử?

**Gợi ý trả lời:**  
Load list parent rồi truy cập collection con từng phần tử → N query. Fix: join fetch, DTO projection, batch fetching.

---

**Câu hỏi:** `@Transactional(readOnly = true)` lợi ích?

**Gợi ý trả lời:**  
Gợi ý Hibernate tối ưu (flush mode), một số driver chỉ đọc — giảm overhead.

---

**Câu hỏi:** Optimistic lock `@Version`?

**Gợi ý trả lời:**  
Cột version tăng khi update; conflict → `OptimisticLockException`; phù hợp contention thấp.

---

**Câu hỏi:** Index DB — khi nào hiệu quả / vô hiệu?

**Gợi ý trả lời:**  
B-tree index cho filter/join/selectivity cao; composite index thứ tự cột theo truy vấn; tránh index trên cột thay đổi liên tục hoặc cardinality thấp (boolean) không mang lại nhiều lợi.

---

**Câu hỏi:** Transaction ACID — isolation anomaly?

**Gợi ý trả lời:**  
Dirty read, non-repeatable read, phantom read — tùy mức isolation DB (Postgres mặc định READ COMMITTED, repeatable read chặn phantom một phần tùy engine).

---

**Câu hỏi:** `EXPLAIN` / query plan — em đọc thế nào?

**Gợi ý trả lời:**  
Seq scan vs index scan, cost, rows estimate; điều chỉnh index, viết lại query, statistics.

---

## 8. REST API, bảo mật, tích hợp

**Câu hỏi:** Idempotent — method HTTP nào?

**Gợi ý trả lời:**  
GET, PUT, DELETE thường thiết kế idempotent; POST tạo mới thường không; cần **idempotency key** cho thanh toán/webhook.

---

**Câu hỏi:** Versioning API?

**Gợi ý trả lời:**  
URL `/v1`, header `Accept-Version`, hoặc query param — trade-off visibility và cache.

---

**Câu hỏi:** Pagination — offset vs cursor?

**Gợi ý trả lời:**  
Offset đơn giản nhưng chậm sâu trang và lệch khi data đổi; cursor ổn định hơn cho feed lớn.

---

**Câu hỏi:** Rate limiting — triển khai?

**Gợi ý trả lời:**  
Gateway, bucket token, Redis sliding window; trả 429 + `Retry-After`.

---

**Câu hỏi:** Keycloak tích hợp Spring — luồng chung?

**Gợi ý trả lời:**  
OIDC login; client credentials / authorization code; realm, client, role mapping vào JWT; resource server validate token.

---

## 9. Redis

**Câu hỏi:** Redis là gì? Khác Memcached / cache trong JVM thế nào?

**Gợi ý trả lời:**  
In-memory **data structure store** (thường dùng làm cache, session store, message broker nhẹ). So với Memcached: Redis có **nhiều kiểu dữ liệu** (Hash, ZSet, Stream…), persistence tùy chọn, replication; Memcached chủ yếu key-value string đơn giản. Cache cục bộ (Caffeine) nhanh nhưng không chia sẻ giữa nhiều instance — Redis phù hợp **nhiều node**.

---

**Câu hỏi:** Vì sao Redis “đơn luồng” (single-threaded) vẫn nhanh?

**Gợi ý trả lời:**  
Tác vụ trong memory, không context-switch giữa thread cho command path chính; I/O đa luồng (phiên bản mới) xử lý network. Bottleneck thường là **lệnh chậm** (KEYS, big hash) hoặc **latency mạng**.

---

**Câu hỏi:** Các kiểu dữ liệu chính và use case?

**Gợi ý trả lời:**  
- **String:** cache JSON, counter (`INCR`), distributed lock (`SET NX PX`).  
- **Hash:** object nhiều field (user profile).  
- **List:** queue đơn giản (LPUSH/BRPOP).  
- **Set:** unique tags, intersection.  
- **Sorted Set (ZSet):** ranking, **delay queue** (score = thời điểm chạy).  
- **Bitmap / HyperLogLog:** đếm unique xấp xỉ, feature flags.  
- **Stream:** log append, consumer group (tương tự log nhỏ nội bộ).

---

**Câu hỏi:** Pipeline và transaction (`MULTI`/`EXEC`) khác nhau?

**Gợi ý trả lời:**  
**Pipeline:** gộp nhiều lệnh giảm round-trip — **không** đảm bảo atomic giữa các lệnh. **MULTI/EXEC:** thực thi khối lệnh **tuần tự** trên một instance — atomic theo batch Redis, không phải SQL transaction đầy đủ (không rollback tự động mọi lỗi logic).

---

**Câu hỏi:** Lua script trong Redis dùng khi nào?

**Gợi ý trả lời:**  
Gộp nhiều thao tác **atomic** (check-and-set, rate limit chính xác) tránh race khi tách nhiều lệnh riêng.

---

**Câu hỏi:** Persistence — **RDB** vs **AOF**? `appendfsync`?

**Gợi ý trả lời:**  
- **RDB:** snapshot theo chu kỳ — file gọn, phục hồi nhanh; có thể **mất dữ liệu** giữa các snapshot khi crash.  
- **AOF:** ghi log lệnh ghi — bền hơn; `appendfsync always/everysec/no` đánh đổi durability vs throughput. Có thể **kết hợp** RDB + AOF. Backup định kỳ ra nơi khác.

---

**Câu hỏi:** Các chính sách **eviction** khi đạt `maxmemory`?

**Gợi ý trả lời:**  
- `noeviction`: báo lỗi khi ghi đủ RAM.  
- `allkeys-lru` / `volatile-lru`: LRU toàn keyspace hoặc chỉ key có TTL.  
- `allkeys-lfu` / `volatile-lfu`: theo tần suất.  
- `volatile-ttl`: ưu tiên key sắp hết TTL.  
- `allkeys-random` / `volatile-random`. Chọn theo cache **có thể miss** vs **bắt buộc giữ** (session).

---

**Câu hỏi:** **Replication** — đọc từ replica có luôn “mới nhất”?

**Gợi ý trả lời:**  
Replica thường **async** — **replication lag**; đọc sau ghi có thể stale. Cần đọc master hoặc cơ chế track read-your-writes nếu nền tảng hỗ trợ.

---

**Câu hỏi:** **Sentinel** vs **Cluster**?

**Gợi ý trả lời:**  
**Sentinel:** HA failover cho **một** master + replica, không sharding dữ liệu. **Cluster:** **sharding** theo **hash slot** (16384 slots), scale ngang; client routing tới đúng node.

---

**Câu hỏi:** Cache **penetration**, **breakdown**, **avalanche**?

**Gợi ý trả lời:**  
- **Penetration:** key không tồn tại luôn miss DB — **Bloom filter** / cache giá trị rỗng TTL ngắn.  
- **Breakdown:** hot key expire, nhiều request đồng loạt đánh DB — **singleflight**, mutex, TTL ngẫu nhiên.  
- **Avalanche:** nhiều key cùng expire — **jitter** TTL, refresh chủ động.

---

**Câu hỏi:** Distributed lock — `SET NX PX`, Redlock?

**Gợi ý trả lời:**  
Lock: `SET key token NX PX ttl`, unlock an toàn bằng Lua so khớp token. **Redlock** (nhiều node) còn tranh luận về correctness — với yêu cầu nghiêm có thể dùng etcd/ZooKeeper.

---

**Câu hỏi:** Pub/Sub vs Stream?

**Gợi ý trả lời:**  
**Pub/Sub:** không lưu — subscriber offline **mất** message. **Stream:** persist, consumer group, replay — phù hợp đảm bảo xử lý hơn.

---

**Câu hỏi:** Lệnh nguy hiểm trong production?

**Gợi ý trả lời:**  
`KEYS *` (chặn event loop), `FLUSHALL` — dùng `SCAN`; giới hạn quyền, rename command.

---

**Câu hỏi:** `SCAN` khác `KEYS`?

**Gợi ý trả lời:**  
`SCAN` duyệt iterator theo chunk, **không** chặn Redis một lần dài; phù hợp production. `KEYS` quét toàn DB — chỉ dev/debug.

---

**Câu hỏi:** HyperLogLog dùng khi nào?

**Gợi ý trả lời:**  
Đếm **cardinality xấp xỉ** (UV, unique visitor) với bộ nhớ cực nhỏ; chấp nhận sai số chuẩn (khoảng 0.81%).

---

**Câu hỏi:** Redis có thể thay **database** chính không?

**Gợi ý trả lời:**  
Thường **không**: Redis ưu tiên tốc độ, persistence tùy cấu hình, không phải SQL/query phức tạp. Một số pattern Redis Stack (JSON/Search) nhưng vẫn cần hiểu trade-off.

---

## 10. Apache Kafka

**Câu hỏi:** Kafka giải quyết bài toán gì? Khác RabbitMQ?

**Gợi ý trả lời:**  
**Distributed commit log** — lưu bền, partition scale ngang, consumer group scale đọc, **replay** theo offset. RabbitMQ: queue + routing linh hoạt, phù hợp task queue; Kafka mạnh throughput, retention log, stream processing.

---

**Câu hỏi:** Broker, topic, partition, segment, offset?

**Gợi ý trả lời:**  
**Topic** chia **partition** — log **append-only**, **thứ tự** trong partition. **Segment** là file con. **Broker** lưu leader/replica. **Offset** là vị trí consumer.

---

**Câu hỏi:** Producer chọn partition?

**Gợi ý trả lời:**  
Có **key** → hash vào partition (cùng key → cùng partition, đảm bảo thứ tự theo key). Không key → round-robin. Custom partitioner khi cần tránh skew.

---

**Câu hỏi:** Consumer group và **rebalance**?

**Gợi ý trả lời:**  
Mỗi partition chỉ một consumer trong group; rebalance khi thêm/bớt consumer — có thể dừng đọc ngắn; cooperative protocol giảm ảnh hưởng.

---

**Câu hỏi:** Commit offset — at-least-once, at-most-once, **exactly-once**?

**Gợi ý trả lời:**  
At-most-once: commit trước xử lý — mất message. At-least-once: xử lý rồi commit — duplicate → **idempotent** consumer. Exactly-once: idempotent producer + transactions / Kafka Streams EOS — phức tạp; thực tế thường at-least-once + idempotency.

---

**Câu hỏi:** ISR, `acks=all`, `min.insync.replicas`?

**Gợi ý trả lời:**  
ISR: replica đồng bộ kịp leader. `acks=all` + `min.insync.replicas` đảm bảo ghi đủ bản sao trước khi ack — trade-off latency.

---

**Câu hỏi:** ZooKeeper vs **KRaft**?

**Gợi ý trả lời:**  
KRaft: metadata quorum nội bộ Kafka — vận hành đơn giản hơn; ZooKeeper đang lộ trình loại bỏ.

---

**Câu hỏi:** Log compaction?

**Gợi ý trả lời:**  
Giữ bản ghi mới nhất theo key, xóa bản cũ — phù hợp changelog/state topic.

---

**Câu hỏi:** Dead letter topic?

**Gợi ý trả lời:**  
Sau N lần lỗi → route sang **DLT** để không kẹt partition; monitor và xử lý tay.

---

**Câu hỏi:** Thứ tự message toàn topic?

**Gợi ý trả lời:**  
Chỉ **trong một partition**. Nhiều partition → không thứ tự global (trừ thiết kế một partition hoặc sort phía consumer).

---

**Câu hỏi:** Spring Kafka — cấu hình production?

**Gợi ý trả lời:**  
Serializer (JSON/Avro), retries, `linger.ms` batch, idempotence, SASL/SSL, giám sát **consumer lag**.

---

**Câu hỏi:** **Retention** (`retention.ms`) và dung lượng disk?

**Gợi ý trả lời:**  
Message giữ theo thời gian hoặc đến khi compact; cần giám sát disk broker; tiered storage (bản Enterprise) hoặc archive S3 nếu tổ chức hỗ trợ.

---

**Câu hỏi:** **Consumer lag** là gì? Làm sao giảm?

**Gợi ý trả lời:**  
Lag = offset hiện tại của producer − offset consumer đã commit. Lag cao do consumer chậm (xử lý nặng, lỗi retry), partition ít hơn throughput — **tăng consumer** (≤ số partition), tối ưu xử lý, scale broker.

---

**Câu hỏi:** **Idempotent producer** — tránh duplicate khi retry?

**Gợi ý trả lời:**  
Producer gán PID + sequence; broker loại bỏ bản ghi trùng trong một phiên — giảm duplicate khi retry mạng.

---

**Câu hỏi:** Kafka Connect / Schema Registry — ý tưởng?

**Gợi ý trả lời:**  
Connect: connector nguồn/đích (DB ↔ Kafka) không viết boilerplate. **Schema Registry** (Avro/JSON Schema): kiểm soát evolution schema, tương thích consumer/producer.

---

## 11. Elasticsearch

**Câu hỏi:** Elasticsearch là gì? Khi nào thay SQL `LIKE`?

**Gợi ý trả lời:**  
Công cụ tìm kiếm phân tán, **full-text**, aggregate. LIKE full scan chậm; ES dùng **inverted index** và scoring.

---

**Câu hỏi:** **Inverted index**?

**Gợi ý trả lời:**  
Map **term → danh sách document** (và vị trí) để tra cứu nhanh term có trong doc nào.

---

**Câu hỏi:** Cluster, index, **primary shard**, **replica**?

**Gợi ý trả lời:**  
Primary shard chia dữ liệu; replica HA + scale read. Số shard quan trọng lúc tạo index (đổi khó — **reindex**).

---

**Câu hỏi:** **Near real-time** — refresh interval?

**Gợi ý trả lời:**  
Document vào buffer, sau **refresh** (mặc định ~1s) mới searchable — đánh đổi latency index vs tìm kiếm tức thì.

---

**Câu hỏi:** Analyzer, tokenizer, filter?

**Gợi ý trả lời:**  
Text → tokenizer tách token → filter (lowercase, stopwords, stemming). Tiếng Việt thường cần ICU/plugin; sai mapping → kết quả search lệch.

---

**Câu hỏi:** `match` vs `term`?

**Gợi ý trả lời:**  
**match:** full-text (phân tích). **term:** giá trị **keyword** không phân tích — dùng field `.keyword` khi cần khớp chính xác.

---

**Câu hỏi:** Filter vs query context?

**Gợi ý trả lời:**  
**Filter:** yes/no, **không** tính score, có cache. **Query:** ảnh hưởng **_score** (BM25).

---

**Câu hỏi:** Đồng bộ DB → ES?

**Gợi ý trả lời:**  
CDC (Debezium), pipeline JDBC định kỳ, hoặc event sau commit DB — **eventual consistency** có kiểm soát.

---

**Câu hỏi:** ILM (Index Lifecycle Management)?

**Gợi ý trả lời:**  
Hot → warm → cold → delete — giảm chi phí log/time-series.

---

**Câu hỏi:** Deep pagination — `search_after`?

**Gợi ý trả lời:**  
`from/size` lớn tốn sort; **search_after** + sort key ổn định cho phân trang sâu.

---

**Câu hỏi:** Aggregations — ví dụ?

**Gợi ý trả lời:**  
Terms, date histogram, metrics — báo cáo và facet (filter theo nhãn, thống kê theo thời gian).

---

**Câu hỏi:** Bool query — `must`, `should`, `must_not`, `filter`?

**Gợi ý trả lời:**  
`must`: bắt buộc khớp (ảnh hưởng score). `should`: tùy chọn (tăng score). `must_not`: loại trừ. `filter`: bắt buộc nhưng không tính score — dùng cho điều kiện cứng và cache.

---

**Câu hỏi:** `multi_match` — các `type` (best_fields, most_fields, cross_fields)?

**Gợi ý trả lời:**  
Tìm trên nhiều field; `best_fields` giống tìm trong một field tổng hợp; `cross_fields` gộp analyzer cho truy vấn dạng “cụm từ” — chọn theo cách user gõ (tên + mô tả).

---

**Câu hỏi:** **Fuzzy** search — trade-off?

**Gợi ý trả lời:**  
Cho phép sai lệch chính tả nhỏ (Levenshtein); tăng recall nhưng chậm và nhiễu nếu `fuzziness` quá lớn.

---

**Câu hỏi:** Dynamic mapping vs explicit `dynamic: false`?

**Gợi ý trả lời:**  
Tự map field mới dễ gây **mapping explosion** (nhiều field lạ); production thường explicit template hoặc tắt dynamic để kiểm soát schema.

---

## 12. WebSocket

**Câu hỏi:** WebSocket khác HTTP thế nào?

**Gợi ý trả lời:**  
Sau **Upgrade**, một TCP **full-duplex** — server push không cần poll. Giảm overhead so với polling.

---

**Câu hỏi:** WebSocket vs **SSE** vs long polling?

**Gợi ý trả lời:**  
Long polling: nhiều request giả lập push. **SSE:** một chiều server→client trên HTTP. **WebSocket:** **hai chiều** — chat, game, cộng tác.

---

**Câu hỏi:** WSS và bảo mật handshake?

**Gợi ý trả lời:**  
Production dùng **WSS** (TLS); kiểm tra **Origin**; auth token (query/header/message đầu) — cân nhắc lộ token trên URL.

---

**Câu hỏi:** Heartbeat / ping-pong?

**Gợi ý trả lời:**  
Phát hiện connection chết (NAT, đổi mạng); client reconnect exponential backoff.

---

**Câu hỏi:** Scale — sticky vs broker?

**Gợi ý trả lời:**  
**Sticky:** LB cố định client→node — đơn giản nhưng lệch tải, deploy khó. **Pub/sub (Redis), Kafka, STOMP relay:** mọi node nhận message cho connection cục bộ — stateless hơn.

---

**Câu hỏi:** Spring — raw WebSocket vs **STOMP**?

**Gợi ý trả lời:**  
Raw: nhẹ, kiểm soát frame. STOMP: topic/queue, `@MessageMapping` — cần **broker relay** khi cluster (in-memory broker không đủ đa node).

---

**Câu hỏi:** Mất tin khi reconnect?

**Gợi ý trả lời:**  
Message id tăng dần; client gửi **lastSeenId**; server replay từ DB/Kafka.

---

**Câu hỏi:** Backpressure?

**Gợi ý trả lời:**  
Giới hạn queue server, drop/throttle; giám sát buffer.

---

**Câu hỏi:** **SockJS** / fallback khi WebSocket bị chặn?

**Gợi ý trả lời:**  
Một số proxy/firewall cắt WebSocket; SockJS (hoặc tương tự) fallback sang **HTTP long-polling** — tương thích tốt hơn, phức tạp hơn pure WebSocket.

---

**Câu hỏi:** Load balancer — WebSocket cần cấu hình gì?

**Gợi ý trả lời:**  
Timeout idle dài hơn HTTP; **upgrade** headers; một số LB cần mode “TCP” hoặc sticky nếu không dùng shared broker.

---

**Câu hỏi:** Giới hạn kích thước message WebSocket?

**Gợi ý trả lời:**  
Cấu hình max frame size server/client; tránh gửi payload lớn — dùng URL tải file riêng hoặc chunk.

---

## 13. Microservices

**Câu hỏi:** Monolith vs microservices — trade-off?

**Gợi ý trả lời:**  
Microservices: deploy/scale theo domain, team độc lập; chi phí **phân tán**, debug, DevOps. Monolith: đơn giản đầu dự án — **strangler** tách dần khi cần.

---

**Câu hỏi:** **Bounded context** (DDD)?

**Gợi ý trả lời:**  
Mỗi service một ngữ cảnh nghiệp vụ rõ; tránh “microservice theo layer” gây chatty.

---

**Câu hỏi:** **API Gateway** vs **BFF**?

**Gợi ý trả lời:**  
Gateway: routing, auth, rate limit. **BFF:** API tối ưu từng loại client (mobile/web), gọi ghép backend.

---

**Câu hỏi:** Service discovery — client-side vs server-side?

**Gợi ý trả lời:**  
Client-side (Eureka…): client biết instance. Server-side / K8s: DNS/Ingress — client đơn giản hơn.

---

**Câu hỏi:** Sync (REST/gRPC) vs async (message)?

**Gợi ý trả lời:**  
Sync dễ hiểu nhưng chuỗi lỗi + latency cộng dồn. Async decouple, **eventual consistency**.

---

**Câu hỏi:** **Saga** — choreography vs orchestration?

**Gợi ý trả lời:**  
Chuỗi transaction cục bộ + **compensating** (hoàn tác). Choreography: event giữa service; orchestration: điều phối trung tâm (temporal, orchestrator).

---

**Câu hỏi:** **Circuit breaker**, timeout, retry?

**Gợi ý trả lời:**  
Ngắt gọi khi downstream lỗi liên tục; timeout tránh treo thread; retry + jitter (tránh thundering herd). Resilience4j.

---

**Câu hỏi:** **Bulkhead**?

**Gợi ý trả lời:**  
Tách pool tài nguyên — lỗi một nhóm không làm chết toàn hệ thống.

---

**Câu hỏi:** **CQRS** / **event sourcing** (ý tưởng)?

**Gợi ý trả lời:**  
CQRS: tách model đọc/ghi. Event sourcing: lưu chuỗi sự kiện — audit mạnh, phức tạp.

---

**Câu hỏi:** Distributed tracing?

**Gợi ý trả lời:**  
OpenTelemetry, trace/span id qua header — Jaeger, Zipkin, Tempo để tìm bottleneck.

---

**Câu hỏi:** **Contract testing** (Pact)?

**Gợi ý trả lời:**  
Đảm bảo producer/consumer không phá vỡ schema khi release độc lập.

---

**Câu hỏi:** **Strangler fig**?

**Gợi ý trả lời:**  
Chuyển traffic dần từ monolith sang service mới theo module — giảm rủi ro.

---

**Câu hỏi:** Anti-pattern?

**Gợi ý trả lời:**  
Distributed monolith, chuỗi sync dài, shared DB cho mọi service, không idempotency.

---

**Câu hỏi:** **Kubernetes** — liveness vs readiness probe với microservices?

**Gợi ý trả lời:**  
**Liveness:** restart pod nếu treo. **Readiness:** gỡ pod khỏi Service khi chưa sẵn sàng (DB chưa kết nối). Tránh đặt liveness quá nhạy gây restart loop.

---

**Câu hỏi:** **Service mesh** (Istio/Linkerd) — lợi ích?

**Gợi ý trả lời:**  
mTLS, traffic split, retry/timeout đồng nhất, observability — chi phí sidecar và độ phức tạp vận hành.

---

**Câu hỏi:** **Outbox pattern** — tránh mất event khi ghi DB?

**Gợi ý trả lời:**  
Ghi business row + row outbox trong **cùng transaction**; worker đọc outbox đẩy Kafka — đảm bảo “ít nhất publish sau khi commit”.

---

**Câu hỏi:** **Choreography vs orchestration** trong Saga — ví dụ?

**Gợi ý trả lời:**  
Choreography: Order service gửi event → Payment → Shipping tự phản ứng; ít điểm trung tâm nhưng khó theo dõi luồng. Orchestration: có **Saga orchestrator** điều phối từng bước — dễ quan sát, rủi ro điểm nghẽn.

---

## 14. Front-end & DevOps (theo CV)

**Câu hỏi:** Angular vs Vue 3 vs React — khác biệt tư duy?

**Gợi ý trả lời:**  
Angular: framework đầy đủ, TypeScript, DI; React: thư viện UI + ecosystem; Vue: template + Composition API, learning curve vừa. Chọn theo team và dự án.

---

**Câu hỏi:** CORS — preflight khi nào?

**Gợi ý trả lời:**  
Request “không đơn giản” (custom header, PUT, v.v.) gửi OPTIONS trước; server trả `Access-Control-*`.

---

**Câu hỏi:** Docker multi-stage build?

**Gợi ý trả lời:**  
Stage build artifact nhỏ, stage runtime chỉ JRE + jar — image nhẹ, bảo mật hơn.

---

**Câu hỏi:** GitHub Actions vs Jenkins?

**Gợi ý trả lời:**  
GHA: YAML trong repo, runner hosted/self-hosted; Jenkins: plugin ecosystem, on-prem linh hoạt — tùy tổ chức.

---

## 15. Kotlin (nếu hỏi thêm)

**Câu hỏi:** Kotlin interoperate Java thế nào?

**Gợi ý trả lời:**  
Cùng JVM; Kotlin `null` safety, data class, extension; chú ý platform types từ Java.

---

**Câu hỏi:** `val` vs `var`, `lateinit`, `lazy`?

**Gợi ý trả lời:**  
Immutability khuyến khích; `lateinit` cho inject sau (non-primitive); `lazy` delegate khởi tạo lười.

---

**Câu hỏi:** Coroutine vs Java thread (ý tưởng)?

**Gợi ý trả lời:**  
Coroutine nhẹ, structured concurrency, suspend — phù hợp IO nhiều; vẫn chạy trên thread pool bên dưới.

---

## 16. Theo CV — giới thiệu, học vấn, kỹ năng

**Câu hỏi:** Anh/chị giới thiệu ngắn gọn về bản thân và lý do ứng tuyển vị trí này?

**Gợi ý trả lời:**  
Em là Ngô Đăng Hán, Fullstack Developer với khoảng gần 3 năm kinh nghiệm xây dựng hệ thống web thực tế (ERP, logistics, tích hợp phần mềm kế toán). Em làm chủ Java/Spring Boot ở backend và Angular/Vue ở frontend, có kinh nghiệm CI/CD và triển khai production. Em mong muốn phát triển lâu dài ở vị trí Fullstack. Em ứng tuyển vì [tự điền].

---

**Câu hỏi:** Tại sao Fullstack thay vì chỉ Backend hoặc Frontend?

**Gợi ý trả lời:**  
Em muốn phụ trách trọn vòng đời tính năng: API, dữ liệu, UX; giảm ma sát giữa tầng. Tham chiếu F-CIM, POS.

---

**Câu hỏi:** Chương trình CNTT PTIT giúp gì cho công việc?

**Gợi ý trả lời:**  
Nền tảng CTDL&GT, CSDL, OOP; ICPC rèn tư duy thuật toán và edge case.

---

**Câu hỏi:** Thời gian học 9/2021 — 1/2026 — đã tốt nghiệp chưa? Ảnh hưởng full-time?

**Gợi ý trả lời:**  
[tự điền thực tế và cách sắp xếp].

---

**Câu hỏi:** Spring Security đã dùng cụ thể thế nào trên các dự án?

**Gợi ý trả lời:**  
[tự điền: JWT, OAuth2 resource server, Keycloak, rule phân quyền].

---

**Câu hỏi:** Monolith vs microservices — khi nào chọn?

**Gợi ý trả lời:**  
Microservices khi team/domain đủ lớn, cần scale độc lập; chi phí vận hành cao. SocialNetwork học tập kiến trúc phân tán.

---

**Câu hỏi:** Kafka trong dự án giải quyết bài toán gì?

**Gợi ý trả lời:**  
[tự điền: event, decouple, fan-out]; nhấn mạnh idempotent consumer.

---

**Câu hỏi:** Redis dùng làm gì (cache, session, pub/sub)?

**Gợi ý trả lời:**  
[tự điền theo CareerCoach / SocialNetwork].

---

**Câu hỏi:** Elasticsearch trong SocialNetwork — đồng bộ dữ liệu thế nào?

**Gợi ý trả lời:**  
[tự điền: job, event Kafka, CDC].

---

**Câu hỏi:** Framework front-end dùng nhiều nhất? Vue 3 Composition API?

**Gợi ý trả lời:**  
[tự điền]; Composition API: logic nhóm theo feature, reuse composables.

---

**Câu hỏi:** CI/CD Jenkins & GitHub Actions — các bước pipeline?

**Gợi ý trả lời:**  
Build, test, scan (nếu có), Docker build/push, deploy; F-CIM Jenkins; POS/CareerCoach GHA.

---

## 17. Theo CV — công ty & dự án

### Rabiloo (10/2024 — hiện tại)

**Câu hỏi:** Làm việc khách Singapore — ngôn ngữ, quy trình, timezone?

**Gợi ý trả lời:**  
[tự điền]; họp định kỳ, ghi nhận async, làm rõ acceptance criteria.

---

**Câu hỏi:** Tích hợp SQL Accounting — giao thức, mapping dữ liệu, xử lý lệch?

**Gợi ý trả lời:**  
[tự điền kỹ thuật thật]; idempotent, log đối soát, rollback nghiệp vụ.

---

### Facenet (10/2023 — 10/2024)

**Câu hỏi:** CI/CD deploy môi trường nào? Tích hợp thuế VNPT khác SQL Accounting ra sao?

**Gợi ý trả lời:**  
[tự điền]; adapter theo vendor, khác format và quy định.

---

**Câu hỏi:** Lý do chuyển từ Facenet sang Rabiloo?

**Gợi ý trả lời:**  
[tự điền tích cực, trung thực].

---

### F-CIM CLOUD

**Câu hỏi:** Đo “+100% báo giá/ngày” thế nào? Module em làm sâu nhất?

**Gợi ý trả lời:**  
[tự điền số liệu]; STAR một thách thức kỹ thuật.

---

### TEMPLATE (PDF)

**Câu hỏi:** Engine template — POI, Doc4j, JodConverter, pipeline docx → PDF?

**Gợi ý trả lời:**  
Giảm code lặp; chuyển đổi qua LibreOffice nếu dùng JodConverter; tối ưu concurrent bằng queue/pool.

---

### TRANSPORT MANAGEMENT

**Câu hỏi:** Tối ưu query và AOP phê duyệt?

**Gợi ý trả lời:**  
Index, tránh N+1; annotation + aspect cho kiểm tra quyền/audit thống nhất.

---

### POS (cá nhân)

**Câu hỏi:** Tingee — callback, idempotency? Docker + Nginx + GHA production?

**Gợi ý trả lời:**  
[tự điền]; SSL termination, secrets, backup DB.

---

### CareerCoach (cá nhân)

**Câu hỏi:** Đồng nhất CV Web/Mobile? Gemini — rate limit, privacy?

**Gợi ý trả lời:**  
Backend canonical output; không leak secret; quota/retry. Keycloak identity; MinIO object storage.

---

### SocialNetwork (cá nhân)

**Câu hỏi:** WebSocket scale? Feed algorithm?

**Gợi ý trả lời:**  
[tự điền trung thực]; Redis pub/sub hoặc sticky; chronological/graph.

---

### ICPC

**Câu hỏi:** Bài ấn tượng? ICPC giúp engineer thế nào?

**Gợi ý trả lời:**  
[tự nhớ bài]; tư duy thuật toán, stress, edge case.

---

## 18. Hành vi & câu hỏi tổng hợp

**Câu hỏi:** Bất đồng kỹ thuật với PM/peer — xử lý?

**Gợi ý trả lời:**  
Dữ kiện, benchmark, POC nhỏ, thống nhất mục tiêu sản phẩm.

---

**Câu hỏi:** Deadline gấp — ưu tiên?

**Gợi ý trả lời:**  
Must-have trước, cắt scope có kiểm soát, test phần rủi ro, báo sớm.

---

**Câu hỏi:** Bug production nghiêm trọng?

**Gợi ý trả lời:**  
Triage, reproduce, hotfix/rollback, khắc phục gốc, postmortem.

---

**Câu hỏi:** Điểm yếu và cách cải thiện?

**Gợi ý trả lời:**  
Một điểm thật + hành động (khóa học, dự án).

---

**Câu hỏi:** Thiết kế lại hệ thống lớn — thay đổi gì?

**Gợi ý trả lời:**  
Observability, test, boundary service, event-driven nếu phù hợp.

---

**Câu hỏi:** Câu hỏi ngược lại cho công ty?

**Gợi ý trả lời:**  
Roadmap sản phẩm, định nghĩa thành công role, quy trình review, on-call.

---

## 19. Nghiệp vụ & thiết kế hệ thống (khó)

### Gửi email / thông báo cho ~1 triệu user

**Câu hỏi:** Thiết kế gửi 1 triệu email marketing hoặc thông báo — không chặn API, không vượt quota nhà cung cấp?

**Gợi ý trả lời:**  
- **Không** gửi đồng bộ trong request HTTP: ghi job vào **queue** (Kafka/SQS/RabbitMQ), API trả ngay “đã nhận”.  
- **Worker** pool đọc queue, gửi theo **batch** phù hợp API (SES/SendGrid/Mailgun có **rate limit** theo giây/phút).  
- **Throttle** cố định + **retry** exponential backoff cho 429/5xx; **dead-letter queue** cho thất bại lặp.  
- **Idempotency key** theo `(campaignId, userId)` tránh gửi trùng khi retry.  
- **Trạng thái** từng gửi trong DB (pending/sent/failed/bounced); webhook bounce/complaint cập nhật để **không gửi lại** user đã unsubscribe/bounce.  
- **Phân segment** theo domain mail (Gmail, Outlook) để tránh spike reputation; warm-up IP/domain nếu mới.  
- **Observability**: metric throughput, lag queue, tỷ lệ bounce.  
- **Compliance**: opt-in, link unsubscribe, lưu vết consent.

---

### Import file Excel ~1 triệu dòng

**Câu hỏi:** User upload Excel rất lớn — tránh OOM, tránh khóa transaction quá lâu?

**Gợi ý trả lời:**  
- **Không** dùng `XSSFWorkbook` load toàn file vào RAM — dùng **streaming** (POI **SAX/event API**, `XSSFReader`, hoặc thư viện **excel-streaming-reader**).  
- **Upload** lên **object storage** (S3/MinIO); server xử lý **bất đồng bộ** (job queue); UI theo dõi tiến độ %.  
- Xử lý **theo dòng** hoặc chunk nhỏ; **batch insert** DB (ví dụ 500–2000 dòng/lô) với **JDBC batch** hoặc `COPY` (Postgres) nếu phù hợp.  
- **Một transaction lớn** cho cả file thường tệ — chia **batch transaction** hoặc staging table → validate → merge (ETL).  
- **Constraint & index**: tạm tắt index không an toàn tùy policy; thường ưu **load staging** rồi merge có kiểm soát.  
- **Validation** tách bước: schema (cột bắt buộc), nghiệp vụ (FK tồn tại), báo lỗi theo dòng vào bảng lỗi.  
- **Multi-thread** cẩn thận thứ tự và connection pool; đo throughput.  
- **CSV** đôi khi thay thế Excel nếu business chấp nhận — đơn giản stream hơn.

---

### Thanh toán / webhook lặp lại

**Câu hỏi:** Cổng thanh toán gửi callback trùng — đảm bảo đúng một lần cập nhật đơn?

**Gợi ý trả lời:**  
Lưu **paymentId** duy nhất; xử lý trong transaction: nếu đã `PAID` thì **return 200 idempotent**; dùng **unique constraint** hoặc bảng xử lý sự kiện. Ký HMAC/verify signature callback.

---

### Báo cáo nặng làm chậm OLTP

**Câu hỏi:** Report tổng hợp quét nhiều tháng — không làm sập DB transaction?

**Gợi ý trả lời:**  
Replica **read-only**, **materialized view**, **pre-aggregate** theo job đêm, hoặc **OLAP** (warehouse) tách khỏi OLTP.

---

### Khóa phân tán & đặt hàng tồn kho

**Câu hỏi:** Hai request cùng mua hết tồn — xử lý?

**Gợi ý trả lời:**  
Transaction isolation phù hợp; **optimistic lock** (`@Version`) hoặc `UPDATE ... WHERE stock >= qty`; hoặc **Redis DECR** có giới hạn; tránh race bằng serializable nếu chấp nhận lock.

---

### Phân quyền phức tạp (ERP)

**Câu hỏi:** Phân quyền theo vai trò + chi nhánh + dữ liệu — thiết kế?

**Gợi ý trả lời:**  
RBAC + **row-level security** (cột `org_id`, filter query), hoặc policy engine (OPA) nếu rất phức tạp; audit mọi thay đổi nhạy cảm.

---

### Đồng bộ dữ liệu giữa hệ thống và phần mềm kế toán (liên quan SQL Accounting / VNPT)

**Câu hỏi:** Đối soát và retry khi lệch?

**Gợi ý trả lời:**  
Log correlation id, bảng **outbox** gửi sự kiện, đồng bộ theo batch đêm, báo cáo diff cho kế toán; **compensation** (ghi đảo, hóa đơn điều chỉnh) theo quy trình.

---

### Tạo PDF hàng loạt (liên quan dự án TEMPLATE)

**Câu hỏi:** Nhiều request render PDF đồng thời — tránh quá tải CPU?

**Gợi ý trả lời:**  
Hàng đợi + worker giới hạn concurrency; pool LibreOffice; cache template; timeout và fallback.

---

### Chat realtime đa máy chủ (SocialNetwork)

**Câu hỏi:** User A và B kết nối hai node khác nhau?

**Gợi ý trả lời:**  
**Redis pub/sub** hoặc Kafka topic theo `conversationId`; mỗi node subscribe và đẩy tới socket cục bộ; hoặc **STOMP broker** (RabbitMQ) làm trung gian.

---

### API LLM (CareerCoach / Gemini)

**Câu hỏi:** Chi phí và ổn định khi traffic tăng?

**Gợi ý trả lời:**  
Cache kết quả có thể; giới hạn theo user; batch prompt nếu phù hợp; queue request; fallback khi quota; không log PII.

---

### Rate limit từ phía client & abuse

**Câu hỏi:** Chống brute-force và spam API?

**Gợi ý trả lời:**  
CAPTCHA sau N lần sai; rate limit IP/user; WAF; logging anomaly.

---

### Sao lưu & disaster recovery (POS production)

**Câu hỏi:** Backup Postgres, restore thử?

**Gợi ý trả lời:**  
`pg_dump`/WAL archive theo lịch; test restore định kỳ; RTO/RPO rõ ràng.

---

### Phiên bản API và mobile/web đồng thời

**Câu hỏi:** Client cũ vẫn chạy khi backend đổi contract?

**Gợi ý trả lời:**  
Versioning, feature flag, deprecate có thời hạn; contract test (Pact) nếu team lớn.

---

*Tài liệu đã mở rộng theo hướng phỏng vấn Java/Spring backend phổ biến và tình huống hệ thống; phần [tự điền] cần khớp kinh nghiệm thực tế của bạn.*
