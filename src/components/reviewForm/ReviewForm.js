import { Button } from "@mui/material"
import { Form } from "react-bootstrap"

const ReviewForm = ({handleSubmit, revText, labelText}) => {
  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextArea1">
            <Form.Label>{labelText}</Form.Label>
            <Form.Control ref={revText} as="textarea" rows={5} />
        </Form.Group>
        <Button variant="contained" onClick={handleSubmit} >Submit</Button>
      </Form>
    </div>
  )
}

export default ReviewForm
