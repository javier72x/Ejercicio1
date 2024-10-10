<!-- Controlador -->
<?php

if (!defined('BASEPATH')) exit('No direct script access allowed');

class Nombre del archivo controlador extends MY_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model("Nombre del archivo model");
    }
    public function index()
    {
        $this->load->view('parcial/header_blank');
        $this->load->view('Nombre del archivo view');
    }
}
?>
