
Làm việc với ngôn ngữ Ruby, chắc chắn phải làm việc với `block` ,  `block` là một trong những tính năng cực kỳ tuyệt vời của Ruby. Nhưng sử dụng `block` hàng ngày không có nghĩa là bạn thực sự hiểu nó hoạt động ra sao, và tận dụng nó như thế nào. Bài viết này mình sẽ diễn đạt lại bằng kiến thức cá nhân những gì mình hiểu về nó.

# Block là gì ?
Nếu bạn chưa biết nó thì cũng không hẳn là bạn chưa dùng nó bao giờ, mình chắc chắn là ai sử dụng ngôn ngữ Ruby dù ở mức độ nào cũng sử dụng nó, chỉ là không biết nó gọi là gì thôi. Ví dụ :
```ruby
[1, 2, 3].each {|x| puts x}

[1, 2, 3].each do |x|
  puts x
end
```
```
1
2
3
=> [1, 2, 3]
```
Hai đoạn code trên thực hiện cùng một chức năng như nhau nên sẽ có cùng một output là điều dễ hiểu.
Bạn thấy khuôn dạng của 2 đoạn code trên có quen và thông dụng không ? Block nó tồn tại ở đó đấy.

**Khái niệm** :  Hiểu nôm na, block là một hay nhiều dòng code được bao bọc bởi cặp ngoặc nhọn `{}` hay cặp `do ... end`.

Về chức năng thì chúng như nhau, nhưng thường sẽ sử dụng `{}` cho block nào có ít code, thường là một dòng và ngược lại, nếu có nhiều code, thường hai dòng trở lên thì dùng `do ... end`, mục đích cũng chỉ là cho đẹp.

# Đặt vấn đề
Dùng `block` thì nhiều, nhưng không hẳn là đã hiểu tại sao nó lại viết cú pháp như thế, bên trong nó làm trò gì.
Hay đơn giản như có những đoạn code bạn thường sử dụng như :
```ruby
def abc &block
  ...
end

["a", "b"].map &:upcase
```
Bạn có từng thắc mắc `&block` để làm gì hay tại sao phải viết `&:upcase`  mà không phải cái gì dễ viết hơn chút ?

# `yield` và cách sử dụng
### Bất cứ method nào cũng âm thầm nhận một block làm tham số.
Bất cứ một method nào trong Ruby cũng ngấm ngầm nhận một `block` làm tham số, kể cả khi tạo method đó ta có khai báo để nó nhận `block` làm tham số hay không. Nôm na kiểu như ai cũng cần ăn để sống, mà không cần bắt ép hay dạy là phải ăn.
Và khi đó,  khi gọi tới `yield` bên trong `method` , nó sẽ có tác dụng thực thi đoạn code nằm trong `block` mà `method` đó âm thầm nhận vào.
Ví dụ :
```ruby
def test_yield
  puts "Start of method"
  yield
  puts "End of method"
end

test_yield {puts "Blabla"}
```
```
Start of method
Blabla
End of method
=> nil
```
Như ví dụ trên ta có thể thấy, method `test_yield` âm thầm nhận vào block `{puts "Blabla"}` mặc dù ta code method đó không nhận bất cứ tham số nào. Code trong method sẽ được chạy lần lượt tới khi gặp `yield`, sau khi thực thi xong code của block, nó sẽ thực thi tiếp code của method đang chạy dang dở.

### `yield` có tác dụng thực thi code trong block, và bản thân nó sẽ nhận giá trị return từ block đó.
```ruby
def test_yield
  puts "Start of method"
  puts yield
  puts "End of method"
end

test_yield {1 + 1}
```
```
Start of method
2
End of method
=> nil
```
Ví dụ trên block `{1 + 1}` sẽ return về 2, `yield` thực thi code trong block nên sẽ nhận được return từ block là 2.

### `yield` cũng có thể truyền tham số vào.
```ruby
def test_yield
  puts "Hello"
  yield "Foo", "Bar"
end

test_yield {|str1, str2, str3| puts str1 + str2}

test_yield do |str1, str2|
  puts str1 + str2
end
```
```
Hello
FooBar
=> nil
```
Dễ dàng nhận ra, `| ... |` sẽ chứa danh sách tham số được sử dụng cho block, được truyền từ `yield` vào. Danh sách tham số trong `| ... |` sẽ map chính xác với danh sách tham số truyền vào khi gọi `yield`, gọi thừa hay thiếu cũng không sao, chỉ là không có dữ liệu cho tham số thôi.
```ruby
def test_yield
  yield "a"
end

test_yield do |str1, str2|
  puts str1
  puts str2.nil?
end
```
```
a
true
```

```ruby
def test_yield
  yield "a", "b"
end

test_yield do |str1|
  puts str1
end
```
```
a
=> nil
```

### Sử dụng biến cục bộ trong block.
Để khai báo biến cục bộ dùng trong block, trong danh sách tham số khai báo bởi `| ... |`, ta sẽ dùng `;` để chia danh sách tham số thành 2 phần, phần đầu là những tham số được truyền vào qua `yield`, phần còn lại phía sau là danh sách biến dùng cục bộ trong block.
```ruby
x = 10
y = 10
1.times do |n; y|
  x = n
  y = n
  puts "x inside the block : #{x}"
  puts "y inside the block : #{y}" 
end
puts "x outside the block : #{x}"
puts "y outside the block : #{y}"
```
```
x inside the block : 0
y inside the block : 0
x outside the block : 0
y outside the block : 10
```
Ta dễ dàng thấy, biến `x` không được khai báo như biến local của block, nên giá trị của nó ở bên ngoài block đã bị thay đổi khi ta gán `x = n`, ngược lại giá trị của `y` vẫn không bị thay đổi bên ngoài block.
### Sử dụng `block_given? ` để kiểm tra có block nào được truyền vào method hay không.
Một điều mà không nhắc cũng hiểu, đó là nếu block được truyền vào nhưng ta không gọi tới `yield` thì block đó cũng không có tác dụng gì và không hề được thực thi. Còn ngược lại, ta gọi `yield` nhưng không truyền block vào thì sao ?
```ruby
def test_no_block
  yield
end
test_no_block
```
```
LocalJumpError: no block given (yield)
```
Lỗi bét be ra ngay. Để tránh lỗi xảy ra, ta có thể sử dụng method `block_given?`, method này sẽ kiểm tra xem có block nào được truyền vào method mà ta đang gọi `yield` hay không.
```ruby
def test_block
  if block_given?
    yield
  else
    puts "No block given"
  end
end

test_block
test_block {puts "I saw a block"}
```
```
No block given
I saw a block
```
# Sử dụng `&block`
Sử dụng cú pháp này để truyền reference của block như là một tham số vào trong method.
```ruby
def test_method &block
  puts block
  block.call
end

test_method {puts "Hello Proc"}
```
```
#<Proc:0x007f99e9896950@(pry):193>
Hello Proc
=> nil
```
Ta có thể thấy block ta truyền vào là một instance của class `Proc`.
Chi tiết về `Block, Proc hay Lambda ...` mình sẽ viết chi tiết ở một bài khác.

# Sử dụng `&:something`
```ruby
["a", "b"].map &:upcase
```
```
=> ["A", "B"]
```
Như vừa nhắc tới cách sử dụng `&block`, sẽ không có chuyện gì nếu tham số truyền vào method là reference của một block, nhưng nếu nó không reference tới block thì method sẽ gọi tới `to_proc` để chuyển nó thành block cho việc sử dụng như bình thường.
Như ví dụ trên, đầu tiên ta sẽ có `:upcase.to_proc` để tạo ra một instance của `Proc`, sau đó truyền reference của block vừa tạo ra vào trong method `.map` để sử dụng.

# Ứng dụng
Ứng dụng của block thì khỏi cần kể, dùng nó ở mọi lúc mọi nơi, nó cũng là một phần tạo ra sự đặc biệt cho ngôn ngữ Ruby.
Tiện vừa nhắc tới việc nếu tham số truyền vào không phải reference tới một block, nó sẽ được `to_proc` để cố gắng chuyển thành một block. Ta có thể áp dụng nó cho bài toán cơ bản sau :
> Từ một mảng các số nguyên, lọc ra những số chia hết cho 3.
```ruby
class Fixnum
  def to_proc
    Proc.new do |obj|
      obj % self == 0
    end
  end
end

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].select &3
puts numbers
```
```
3
6
9
```
3 là một `Fixnum`, nên ta định nghĩa thêm method `to_proc` nhằm mục đích đưa logic để xác định nó có chia hết cho 3 hay không.

# Kết luận
Trên đây mình đã nói khá đầy đủ về `block` cũng như `yield`, khái niệm và cách thức hoạt động của chúng. Nắm vững chúng giúp chúng hình dung được cách thức hoạt động của những dòng code chúng ta viết, cũng như chủ động tuỳ biến, sử dụng theo ý của chúng ta.
