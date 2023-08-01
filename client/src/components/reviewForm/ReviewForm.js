import {Form,Button} from 'react-bootstrap';

const ReviewForm = ({handleSubmit,revText,labelText,editText,defaultValue}) => {
  console.log(revText);
  console.log(editText);
  return (
    <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>{labelText}</Form.Label>
            <Form.Control ref={revText} as="textarea" rows={3} defaultValue={defaultValue} />
        </Form.Group>
        <Button variant="outline-info" onClick={handleSubmit}>{editText!=0?'Edit':'Submit'}</Button>
    </Form>   
  )
}
export default ReviewForm